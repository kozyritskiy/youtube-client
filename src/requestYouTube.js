import _ from 'lodash';
import tplawesome from './tplAwesome';
import controlPaginationNext from './controlPaginationNext';
import controlPaginationPrev from './controlPaginationPrev';
import getPageX from './getPageX';

let currentListnerUp;
let currentListnerDown;
let currentListnerLeave;
let currentListnerMove;

export default function requestYouTube(token, maxRes) {
  // prepare the request
  const search = document.getElementById('search');
  const body = document.getElementsByTagName('body')[0];
  const swipe = document.querySelector('.swipe');
  const content = document.getElementById('results');
  const paginationList = document.querySelector('.pagination__list');

  const searchValue = search.value;
  if (searchValue !== '') {
    const request = gapi.client.youtube.search.list({
      part: 'id',
      type: 'video',
      q: searchValue,
      maxResults: maxRes,
      pageToken: token,
      order: 'viewCount',
      publishedAfter: '2017-01-01T00:00:00Z',
    });

    // execute the request
    request.execute((response) => {
      const results = response.result;
      let isDown = false;
      let startX;
      let walk;
      const bodyWidth = body.clientWidth;

      // swipe start
      content.removeEventListener('mouseup', currentListnerUp, false);
      content.removeEventListener('mousedown', currentListnerDown, false);
      content.removeEventListener('mouseleave', currentListnerLeave, false);
      content.removeEventListener('mousemove', currentListnerMove, false);

      content.removeEventListener('touchstart', currentListnerDown, false);
      content.removeEventListener('touchmove', currentListnerMove, false);
      content.removeEventListener('touchend', currentListnerUp, false);

      currentListnerUp = function listnerUp() {
        isDown = false;
        content.classList.remove('s-main__list_is-active');

        if (walk > 0) {
          content.style.transform = 'translate3d(200%,0,0)';
          setTimeout(() => {
            content.style.display = 'none';
            content.style.transform = 'translate3d(-50%,0,0)';
          }, 500);
          controlPaginationPrev();
          setTimeout(() => {
            requestYouTube(results.prevPageToken, maxRes);
          }, 550);
        }
        if (walk < 0) {
          content.style.transform = 'translate3d(-300%,0,0)';
          setTimeout(() => {
            content.style.display = 'none';
            content.style.transform = 'translate3d(-50%,0,0)';
          }, 500);
          controlPaginationNext();
          setTimeout(() => {
            requestYouTube(results.nextPageToken, maxRes);
          }, 550);
        }
      };

      currentListnerDown = function listnerDown(e) {
        isDown = true;
        const pageX = getPageX(e);
        content.classList.add('s-main__list_is-active');
        startX = pageX - content.offsetLeft;
      };

      currentListnerLeave = function listnerLeave() {
        isDown = false;
        content.classList.remove('s-main__list_is-active');
        setTimeout(() => {
          content.style.transform = 'translate3d(-50%,0,0)';
        }, 500);
      };

      currentListnerMove = function listnerMove(e) {
        if (!isDown) return; // stop the fn from running
        e.preventDefault();
        const pageX = getPageX(e);
        const x = pageX - content.offsetLeft;

        walk = x - startX;

        const walkPerc = (walk * 100) / bodyWidth;
        const shift = -50 + walkPerc;

        content.style.transform = `translate3d(${shift}%,0,0)`;
      };

      content.addEventListener('mousedown', currentListnerDown);
      content.addEventListener('mouseleave', currentListnerLeave);
      content.addEventListener('mouseup', currentListnerUp);
      content.addEventListener('mousemove', currentListnerMove);

      content.addEventListener('touchstart', currentListnerDown);
      content.addEventListener('touchmove', currentListnerMove);
      content.addEventListener('touchend', currentListnerUp);
      // swipe  end

      //  clear content start
      while (content.firstChild) {
        content.removeChild(content.firstChild);
      }
      //  clear content end

      // render cycle start
      _.each(results.items, (item) => {
        const requestTwo = gapi.client.request({
          method: 'GET',
          path: '/youtube/v3/videos',
          params: {
            id: item.id.videoId,
            part: 'snippet,statistics',
          },
        });

        requestTwo.execute((response) => {
          const data = response.items[0];
          const {
            id,
            snippet: {
              title,
              description,
              channelTitle,
              thumbnails: {
                medium: {
                  url,
                },
              },
            },
            statistics: {
              viewCount,
            },
          } = data;
          let { snippet: { publishedAt } } = data;
          publishedAt = publishedAt.slice(0, 10);

          fetch('./template/item.html')
            .then(response => response.text().then((dataTpl) => {
              if (response.ok) {
                return dataTpl;
              } return false;
            }))
            .then((dataTpl) => {
              const someLi = document.createElement('li');
              someLi.innerHTML = tplawesome(dataTpl, [{
                id, url, title, description, channelTitle, publishedAt, viewCount,
              }]);
              someLi.classList.add('s-main__item');
              content.appendChild(someLi);
            });
        });
      });
      content.style.display = 'flex';
      // render cycle end
      setTimeout(() => {
        paginationList.style.display = 'flex';
        swipe.style.display = 'flex';
      }, 700);
    });
  }
}
