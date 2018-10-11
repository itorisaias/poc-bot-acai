import { v4 } from 'node-uuid';

const httpFake = function(mock) {
  const delay = resolve => setTimeout(resolve, 150);

  const getAll = () => new Promise(delay).then(() => mock);

  const getOne = id => {
    return new Promise(delay).then(() => {
      const items = mock.filter(item => item.id === id);
      return items.length === 0 ? null : items[0];
    });
  };

  const post = data => {
    data.id = data.id || v4();
    return new Promise(delay).then(() => mock.push(data));
  };

  const put = data => {
    return new Promise(delay).then(() => {
      const index = mock.findIndex(item => item.id === data.id);
      mock.splice(index, 1);
      mock.push(data);
    });
  };

  const del = id => {
    return new Promise(delay).then(() => {
      const index = mock.findIndex(item => item.id === id);
      mock.splice(index, 1);
    });
  };

  return {
    getAll,
    getOne,
    post,
    put,
    del
  };
};

export { httpFake };
