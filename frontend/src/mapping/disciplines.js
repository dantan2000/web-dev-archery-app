const apiDisciplines = [
  {
      "Id": "1",
      "Discipline": "Outdoor Archery",
      "ViewOrder": "1"
  },
  {
      "Id": "2",
      "Discipline": "Indoor Archery",
      "ViewOrder": "2"
  },
  {
      "Id": "3",
      "Discipline": "Field Archery",
      "ViewOrder": "3"
  },
  {
      "Id": "4",
      "Discipline": "3D Archery",
      "ViewOrder": "4"
  },
  {
      "Id": "5",
      "Discipline": "Ski Archery",
      "ViewOrder": "5"
  },
  {
      "Id": "6",
      "Discipline": "Run Archery",
      "ViewOrder": "6"
  },
  {
      "Id": "7",
      "Discipline": "Clout Archery",
      "ViewOrder": "7"
  },
  {
      "Id": "8",
      "Discipline": "Flight Archery",
      "ViewOrder": "8"
  },
  {
      "Id": "10",
      "Discipline": "N/A",
      "ViewOrder": "10"
  }
];


const disciplines = {};

apiDisciplines.forEach(dis => disciplines[dis.Id] = dis.Discipline);

export default disciplines;