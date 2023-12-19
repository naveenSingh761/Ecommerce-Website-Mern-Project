const cd = require("chance")();

let x = 0;
while (x < 50) {
  console.log(
    `
    {
"name": "${cd.name()}",
"age": ${cd.natural({ min: 20, max: 40 })},
"Photo": [
  "https://picsum.photos/id/${cd.natural({ min: 10, max: 250 })}/200/300",
  "https://picsum.photos/id/${cd.natural({ min: 10, max: 250 })}/200/300",
  "https://picsum.photos/id/${cd.natural({ min: 10, max: 250 })}/200/300",
  "https://picsum.photos/id/${cd.natural({ min: 10, max: 250 })}/200/300",
  "https://picsum.photos/id/${cd.natural({ min: 10, max: 250 })}/200/300"


],
"Country": "${cd.country({ full: true })}",
"gender": "${cd.gender()}",
"phoneNo": "+${cd.phone()}"
  },
`
  );

  x++;
}
