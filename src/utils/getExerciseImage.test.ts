import { getExerciseImage } from "./getExerciseImage";

const imageList = [
  {
    id: 3,
    uuid: "ef0b00e2-3323-4e7f-88fe-d71ef34b3384",
    exercise_base: 167,
    image: "https://wger.de/media/exercise-images/91/Crunches-1.png",
    is_main: true,
    status: "2",
    style: "1",
  },
  {
    id: 7,
    uuid: "bed4f21b-28be-4ef1-bd88-1a4e3db66c5c",
    exercise_base: 427,
    image: "https://wger.de/media/exercise-images/93/Decline-crunch-1.png",
    is_main: true,
    status: "2",
    style: "1",
  },
  {
    id: 11,
    uuid: "59efcec2-a7ce-40ba-bf2b-1a6eabe52fbd",
    exercise_base: 301,
    image: "https://wger.de/media/exercise-images/128/Hyperextensions-1.png",
    is_main: true,
    status: "2",
    style: "1",
  },
  {
    id: 15,
    uuid: "1c37e4e1-5144-4a50-8294-16180a9bc767",
    exercise_base: 76,
    image:
      "https://wger.de/media/exercise-images/88/Narrow-grip-bench-press-1.png",
    is_main: true,
    status: "2",
    style: "1",
  },
  {
    id: 19,
    uuid: "065f9418-6245-46ae-8e24-b4013ce084e4",
    exercise_base: 95,
    image:
      "https://wger.de/media/exercise-images/129/Standing-biceps-curl-1.png",
    is_main: true,
    status: "2",
    style: "1",
  },
  {
    id: 23,
    uuid: "ca71df8e-a6d6-453f-a25a-f4cebae3b970",
    exercise_base: 92,
    image: "https://wger.de/media/exercise-images/81/Biceps-curl-1.png",
    is_main: true,
    status: "2",
    style: "1",
  },
  {
    id: 27,
    uuid: "7276a19e-06d0-45ae-a2a3-569bed75686b",
    exercise_base: 91,
    image: "https://wger.de/media/exercise-images/74/Bicep-curls-1.png",
    is_main: true,
    status: "2",
    style: "1",
  },
  {
    id: 31,
    uuid: "e9873b1f-de19-455e-a05d-f32910a74db9",
    exercise_base: 195,
    image: "https://wger.de/media/exercise-images/82/Tricep-dips-2-1.png",
    is_main: true,
    status: "2",
    style: "1",
  },
  {
    id: 35,
    uuid: "c64a9199-5ad7-4552-abdd-491deb02296a",
    exercise_base: 197,
    image: "https://wger.de/media/exercise-images/83/Bench-dips-1.png",
    is_main: true,
    status: "2",
    style: "1",
  },
  {
    id: 39,
    uuid: "dd0a0445-11cf-45d3-bbd1-6ae0add6b39c",
    exercise_base: 572,
    image: "https://wger.de/media/exercise-images/151/Dumbbell-shrugs-2.png",
    is_main: true,
    status: "2",
    style: "1",
  },
  {
    id: 43,
    uuid: "f22c1928-fc70-4595-b090-af73e7a019fe",
    exercise_base: 571,
    image: "https://wger.de/media/exercise-images/150/Barbell-shrugs-1.png",
    is_main: true,
    status: "2",
    style: "1",
  },
  {
    id: 47,
    uuid: "aa574839-4a7e-4c0d-ac72-2f7448478a1c",
    exercise_base: 272,
    image: "https://wger.de/media/exercise-images/86/Bicep-hammer-curl-1.png",
    is_main: true,
    status: "2",
    style: "1",
  },
];

const crunches = {
  id: 91,
  uuid: "d325dd5c-6833-41c7-8eea-6b95c4871133",
  name: "Crunches",
  exercise_base: 167,
  status: "2",
  description:
    "Lay down on your back a soft surface, the feet are on the floor. Ask a partner or use some other help (barbell, etc.) to keep them fixed, your hands are behind your head. From this position move your upper body up till your head or elbows touch your knees. Do this movement by rolling up your back.",
  creation_date: "2013-05-05",
  category: 10,
  muscles: [6],
  muscles_secondary: [3],
  equipment: [8, 4],
  language: 2,
  license: 1,
  license_author: "wger.de",
  variations: [91, 94, 92, 416, 93, 176, 95, 170],
};

const bicepsCurls = {
  id: 129,
  uuid: "8c6c1544-cbf8-403c-ae12-b27b392702f8",
  name: "Biceps Curl With Cable",
  exercise_base: 95,
  status: "2",
  description:
    "Stand around 30 - 40cm away from the cable, the feet are firmly on the floor. Take the bar and lift the weight with a fast movements. Lower the weight as with the dumbbell curls slowly and controlled.",
  creation_date: "2013-05-05",
  category: 8,
  muscles: [1],
  muscles_secondary: [],
  equipment: [],
  language: 2,
  license: 1,
  license_author: "wger.de",
  variations: [74, 81, 80, 129, 275, 298, 86, 138, 193, 208, 205, 768, 305],
};

const arnoldShoulderPress = {
  id: 227,
  uuid: "53ca25b3-61d9-4f72-bfdb-492b83484ff5",
  name: "Arnold Shoulder Press",
  exercise_base: 20,
  status: "2",
  description:
    "Very common shoulder exercise.\n\n As shown here: https://www.youtube.com/watch?v=vj2w851ZHRM",
  creation_date: "2014-03-09",
  category: 13,
  muscles: [],
  muscles_secondary: [],
  equipment: [3],
  language: 2,
  license: 1,
  license_author: "trzr23",
  variations: [227, 329, 229, 190, 119, 123, 152, 155],
};

const axeHold = {
  id: 289,
  uuid: "6add5973-86d0-4543-928a-6bb8b3f34efc",
  name: "Axe Hold",
  exercise_base: 31,
  status: "2",
  description:
    "Grab dumbbells and extend arms to side and hold as long as you can",
  creation_date: "2014-11-02",
  category: 8,
  muscles: [],
  muscles_secondary: [],
  equipment: [3],
  language: 2,
  license: 1,
  license_author: "GrosseHund",
  variations: [],
};

test("getExerciseImage returns an image url when a valid exercise with an existing image is given", () => {
  expect(getExerciseImage(imageList, crunches)).toBe(
    "https://wger.de/media/exercise-images/91/Crunches-1.png"
  );
  expect(getExerciseImage(imageList, bicepsCurls)).toBe(
    "https://wger.de/media/exercise-images/129/Standing-biceps-curl-1.png"
  );
});

test("getExerciseImage returns undefined when an invalid exercise with no existing image is given", () => {
  expect(getExerciseImage(imageList, arnoldShoulderPress)).toBe(undefined);
  expect(getExerciseImage(imageList, axeHold)).toBe(undefined);
});
