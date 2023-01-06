// mock 首页数据
export default {
  // 可选城市
  'POST /api/commons/citys': (req, res) => {
    res.json({
      status: 200,
      errMsg: '',
      data: [
        [
          { label: '杭州', value: '10001' },
          { label: '苏州', value: '10002' },
        ],
      ],
    });
  },
  // 热门民宿
  'POST /api/house/hot': (req, res) => {
    res.json({
      status: 200,
      errMsg: '',
      data: [
        {
          id: 1,
          img: 'https://www.itying.com/images/flutter/slide01.jpg',
          title: '东城民宿',
          info: '东城区交通方便',
          price: '100',
        },
        {
          id: 2,
          img: 'https://www.itying.com/images/flutter/slide02.jpg',
          title: '西城民宿',
          info: '西城区山水怡情',
          price: '120',
        },
        {
          id: 3,
          img: 'https://www.itying.com/images/flutter/slide03.jpg',
          title: '新区民宿',
          info: '新区民宿位置优越',
          price: '200',
        },
        {
          id: 4,
          img: 'https://www.itying.com/images/flutter/slide01.jpg',
          title: '老城民宿',
          info: '老城区风景秀美',
          price: '220',
        },
      ],
    });
  },
};
