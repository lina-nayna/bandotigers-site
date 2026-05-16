export const STORE = 'https://bandotiger.myshopify.com'

export const products = [
  {
    id: '1',
    img: '/images/x.jpeg',
    name: 'Victory Hoodie',
    sub: 'Off-White',
    price: '€ 89.95',
    tag: 'Bestseller',
    handle: 'victory-hoodie-white',
    sizes: ['XS', 'S', 'M', 'L'],
    variantIds: {
      XS: '53935889056085',
      S:  '53936411509077',
      M:  '53936411541845',
      L:  '53936411574613',
    },
    description:
      'The signature Victory Hoodie in off-white. Heavyweight 450gsm fleece. Oversized fit. Embroidered tiger detail. Built for those who move without permission.',
    details: [
      '450gsm heavyweight fleece',
      'Oversized fit — size up not required',
      'Embroidered tiger graphic',
      'Kangaroo pocket',
      '100% cotton',
    ],
  },
  {
    id: '2',
    img: '/images/trui.jpeg',
    name: 'Victory Hoodie',
    sub: 'Obsidian Black',
    price: '€ 89.95',
    tag: 'Limited',
    handle: 'victory-hoodie-black',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    variantIds: {
      XS: '53935889121621',
      S:  '53936410788181',
      M:  '53936410820949',
      L:  '53936410853717',
      XL: '53936410886485',
    },
    description:
      'The signature Victory Hoodie in pitch black. Heavyweight 450gsm fleece. Oversized fit. Embroidered tiger detail. Two forces. One identity.',
    details: [
      '450gsm heavyweight fleece',
      'Oversized fit — size up not required',
      'Embroidered tiger graphic',
      'Kangaroo pocket',
      '100% cotton',
    ],
  },
  {
    id: '3',
    img: '/images/z.jpeg',
    name: 'Old English Tee',
    sub: 'White / Ecru',
    price: '€ 49.95',
    tag: 'New',
    handle: 'old-english-tee',
    sizes: [],
    variantIds: {},
    description:
      'Old English lettering. Premium 240gsm jersey. Slightly oversized. The statement tee for those who need no introduction.',
    details: [
      '240gsm premium jersey',
      'Slightly oversized fit',
      'Old English print',
      '100% cotton',
    ],
  },
  {
    id: '4',
    img: '/images/r.jpeg',
    name: 'Victory Hoodie II',
    sub: 'Ivory',
    price: '€ 94.95',
    tag: 'Drop',
    handle: 'victory-hoodie-ii',
    sizes: ['One Size'],
    variantIds: {
      'One Size': '53935891448149',
    },
    description:
      "The second iteration of the Victory Hoodie. Washed finish. Distressed tiger graphic. Limited run — once it's gone, it's gone.",
    details: [
      '450gsm heavyweight fleece',
      'Oversized fit',
      'Distressed tiger graphic',
      'Limited run',
      '100% cotton',
    ],
  },
]
