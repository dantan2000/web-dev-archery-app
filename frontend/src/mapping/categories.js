const apiCategories = [
  {
      "Id": 9,
      "Code": "CM",
      "Name": "Compound Men",
      "ParaAr": false,
      "His": false,
      "DivId": [
          2
      ],
      "DivisionLabel": "Compound",
      "PlayersLabel": "Men",
      "Mixed": false,
      "Gender": [
          "M"
      ]
  },
  {
      "Id": 10,
      "Code": "CW",
      "Name": "Compound Women",
      "ParaAr": false,
      "His": false,
      "DivId": [
          2
      ],
      "DivisionLabel": "Compound",
      "PlayersLabel": "Women",
      "Mixed": false,
      "Gender": [
          "W"
      ]
  },
  {
      "Id": 1,
      "Code": "RM",
      "Name": "Recurve Men",
      "ParaAr": false,
      "His": false,
      "DivId": [
          1
      ],
      "DivisionLabel": "Recurve",
      "PlayersLabel": "Men",
      "Mixed": false,
      "Gender": [
          "M"
      ]
  },
  {
      "Id": 2,
      "Code": "RW",
      "Name": "Recurve Women",
      "ParaAr": false,
      "His": false,
      "DivId": [
          1
      ],
      "DivisionLabel": "Recurve",
      "PlayersLabel": "Women",
      "Mixed": false,
      "Gender": [
          "W"
      ]
  }
];


const categories = {};

apiCategories.forEach(cat => categories[cat.Code] = cat.Name);

export default categories;