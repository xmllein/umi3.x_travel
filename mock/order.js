// 订单mock数据
export default {
  // 订单列表
  'POST /api/order/lists': (req, res) => {
    setTimeout(() => {
      let data;
      if (req.body.pageNum < 4) {
        data = [
          {
            id: 1,
            img: 'https://www.itying.com/images/flutter/slide01.jpg',
            title: '东城民宿',
            info: '东城区交通方便',
            price: '100',
          },
          {
            id: 2,
            img: 'https://www.itying.com/images/flutter/slide01.jpg',
            title: '西城民宿',
            info: '西城区山水怡情',
            price: '120',
          },
          {
            id: 3,
            img: 'https://www.itying.com/images/flutter/slide01.jpg',
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
          {
            id: 5,
            img: 'https://www.itying.com/images/flutter/slide01.jpg',
            title: '东城民宿',
            info: '东城区交通方便',
            price: '100',
          },
          {
            id: 6,
            img: 'https://www.itying.com/images/flutter/slide01.jpg',
            title: '西城民宿',
            info: '西城区山水怡情',
            price: '120',
          },
          {
            id: 7,
            img: 'https://www.itying.com/images/flutter/slide01.jpg',
            title: '新区民宿',
            info: '新区民宿位置优越',
            price: '200',
          },
          {
            id: 8,
            img: 'https://www.itying.com/images/flutter/slide01.jpg',
            title: '老城民宿',
            info: '老城区风景秀美',
            price: '220',
          },
        ];
      } else {
        data = [];
      }
      res.json({
        status: 200,
        data,
      });
    }, 500);
  },
};
