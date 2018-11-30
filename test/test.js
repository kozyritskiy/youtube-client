const assert = require('assert');

Object.freeze(assert);

const tplAwesome = require('../src/tplAwesome.js');

describe('tplAwesome', () => {
  it('should replace the variable with a property name', () => {
    const result = tplAwesome('Hello {{name}}!', [{ name: 'John' }]);
    assert.deepEqual(result, 'Hello John!');
  });

  it('should replace the variable with a property title', () => {
    const result = tplAwesome('<div class="s-main__author-name">{{channelTitle}}</div>', [{ channelTitle: 'AwesomeTitle' }]);
    assert.deepEqual(result, '<div class="s-main__author-name">AwesomeTitle</div>');
  });

  it('should replace the variable in the layout with a  object property', () => {
    const result = tplAwesome('<div class="s-main__author-name">{{channelTitle}}</div><div class="s-main__view-count">{{viewCount}}</div>', [{ channelTitle: 'AwesomeTitle', viewCount: 'AwesomeViewCount' }]);
    assert.deepEqual(result, '<div class="s-main__author-name">AwesomeTitle</div><div class="s-main__view-count">AwesomeViewCount</div>');
  });
});
