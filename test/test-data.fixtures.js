const faker = require('faker')

const testData = {
  "folders": [
    {
      "title": "Important",
      "id": 1
    },
    {
      "title": "Super",
      "id": 2
    },
    {
      "title": "Spangley",
      "id": 3
    }
  ],
  "notes": [
    {
        "id": 1,  
      "title": "Dogs",
      "folderid": 1,
      "content": faker.lorem.paragraphs(),
      "modified": "2019-07-30T07:38:54.225Z"
    },
    {
        "id": 2,
      "title": "Cats",
      "folderid": 3,
      "content": faker.lorem.paragraphs(),
      "modified": "2019-07-30T07:38:54.225Z"
    },
    {
        "id": 3,
      "title": "Pigs",
      "folderid": 2,
      "content": faker.lorem.paragraphs(),
      "modified": "2019-07-30T07:38:54.225Z"
    },
    {
        "id": 4,
      "title": "Birds",
      "folderid": 1,
      "content": faker.lorem.paragraphs(),
      "modified": "2019-07-30T07:38:54.225Z"
    },
    {
        "id": 5,
      "title": "Bears",
      "modified": "2018-07-12T23:00:00.000Z",
      "folderid": 3,
      "content": faker.lorem.paragraphs(),
      "modified": "2019-07-30T07:38:54.225Z"
    },
    {
        "id": 6,
      "title": "Horses",
      "folderid": 2,
      "content": faker.lorem.paragraphs(),
      "modified": "2019-07-30T07:38:54.225Z"
    },
    {
        "id": 7,
      "title": "Tigers",
      "folderid": 1,
      "content": faker.lorem.paragraphs(),
      "modified": "2019-07-30T07:38:54.225Z"
    },
    {
        "id": 8,
      "title": "Wolves",
      "folderid": 1,
      "content": faker.lorem.paragraphs(),
      "modified": "2019-07-30T07:38:54.225Z"
    },
    {
        "id": 9,
      "title": "Elephants",
      "folderid": 1,
      "content": faker.lorem.paragraphs(),
      "modified": "2019-07-30T07:38:54.225Z"
    },
    {
        "id": 10,
      "title": "Lions",
      "folderid": 3,
      "content": faker.lorem.paragraphs(),
      "modified": "2019-07-30T07:38:54.225Z"
    },
    {
        "id": 11,
      "title": "Monkeys",
      "folderid": 1,
      "content": faker.lorem.paragraphs(),
      "modified": "2019-07-30T07:38:54.225Z"
    },
    {
        "id": 12,
      "title": "Bats",
      "folderid": 2,
      "content": faker.lorem.paragraphs(),
      "modified": "2019-07-30T07:38:54.225Z"
    },
    {
        "id": 13,
      "title": "Turtles",
      "folderid": 3,
      "content": faker.lorem.paragraphs(),
      "modified": "2019-07-30T07:38:54.225Z"
    },
    {
        "id": 14,
      "title": "Zebras",
      "folderid": 1,
      "content": faker.lorem.paragraphs(),
      "modified": "2019-07-30T07:38:54.225Z"
    }
  ]
};

module.exports = testData;
