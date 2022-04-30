const apiDivisions = [
  {
    "Id": 8,
    "Code": "AL",
    "Name": "American Longbow",
    "LimitedToDiscipline": [
      8
    ]
  },
  {
    "Id": 3,
    "Code": "B",
    "Name": "Barebow"
  },
  {
    "Id": 2,
    "Code": "C",
    "Name": "Compound"
  },
  {
    "Id": 10,
    "Code": "CF",
    "Name": "Compound Flight Bow",
    "LimitedToDiscipline": [
      8
    ]
  },
  {
    "Id": 11,
    "Code": "CT",
    "Name": "Compound Target Bow",
    "LimitedToDiscipline": [
      8
    ]
  },
  {
    "Id": 7,
    "Code": "FC",
    "Name": "Conventional Flight Bow",
    "LimitedToDiscipline": [
      8
    ]
  },
  {
    "Id": 9,
    "Code": "EL",
    "Name": "English Longbow",
    "LimitedToDiscipline": [
      8
    ]
  },
  {
    "Id": 12,
    "Code": "FB",
    "Name": "Foot Bow",
    "LimitedToDiscipline": [
      8
    ]
  },
  {
    "Id": 5,
    "Code": "I",
    "Name": "Instinctive bow"
  },
  {
    "Id": 4,
    "Code": "L",
    "Name": "Longbow"
  },
  {
    "Id": 1,
    "Code": "R",
    "Name": "Recurve"
  },
  {
    "Id": 6,
    "Code": "RT",
    "Name": "Target Recurve Bow",
    "LimitedToDiscipline": [
      8
    ]
  }
];


const divisions = {};

apiDivisions.forEach(div => divisions[div.Id] = div.Name);

export default divisions;