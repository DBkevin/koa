const faker = require('faker/locale/zh_CN');
let UsersList = [];

for (let index1 = 0; index1 < 10; index1++) {
    let tmp = {};
    if (index1 ==0) {
        tmp.name = "lee";
        tmp.email = "123@123.com";
        tmp.password = '$2a$10$SBdEDqPltvR7uOBJZ6quGedSYXvUuP8QtKLgS0DfKIQs2THbClBFi'; //123123
        UsersList.push(tmp);
        tmp = null;
    } else {
        tmp.name = faker.name.lastName() + faker.name.firstName();
        tmp.email = faker.internet.exampleEmail();
        tmp.password = "$2a$10$SBdEDqPltvR7uOBJZ6quGedSYXvUuP8QtKLgS0DfKIQs2THbClBFi"; //123123
        UsersList.push(tmp);
        tmp = null;
    }
}

