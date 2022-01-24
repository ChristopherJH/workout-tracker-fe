import { getMuscleName } from "./getMuscleName";

const muscleList = [
  {
    id: 2,
    name: "Anterior deltoid",
    is_front: true,
    image_url_main: "/static/images/muscles/main/muscle-2.svg",
    image_url_secondary: "/static/images/muscles/secondary/muscle-2.svg",
  },
  {
    id: 1,
    name: "Biceps brachii",
    is_front: true,
    image_url_main: "/static/images/muscles/main/muscle-1.svg",
    image_url_secondary: "/static/images/muscles/secondary/muscle-1.svg",
  },
  {
    id: 11,
    name: "Biceps femoris",
    is_front: false,
    image_url_main: "/static/images/muscles/main/muscle-11.svg",
    image_url_secondary: "/static/images/muscles/secondary/muscle-11.svg",
  },
  {
    id: 13,
    name: "Brachialis",
    is_front: true,
    image_url_main: "/static/images/muscles/main/muscle-13.svg",
    image_url_secondary: "/static/images/muscles/secondary/muscle-13.svg",
  },
  {
    id: 7,
    name: "Gastrocnemius",
    is_front: false,
    image_url_main: "/static/images/muscles/main/muscle-7.svg",
    image_url_secondary: "/static/images/muscles/secondary/muscle-7.svg",
  },
  {
    id: 8,
    name: "Gluteus maximus",
    is_front: false,
    image_url_main: "/static/images/muscles/main/muscle-8.svg",
    image_url_secondary: "/static/images/muscles/secondary/muscle-8.svg",
  },
  {
    id: 12,
    name: "Latissimus dorsi",
    is_front: false,
    image_url_main: "/static/images/muscles/main/muscle-12.svg",
    image_url_secondary: "/static/images/muscles/secondary/muscle-12.svg",
  },
  {
    id: 14,
    name: "Obliquus externus abdominis",
    is_front: true,
    image_url_main: "/static/images/muscles/main/muscle-14.svg",
    image_url_secondary: "/static/images/muscles/secondary/muscle-14.svg",
  },
  {
    id: 4,
    name: "Pectoralis major",
    is_front: true,
    image_url_main: "/static/images/muscles/main/muscle-4.svg",
    image_url_secondary: "/static/images/muscles/secondary/muscle-4.svg",
  },
  {
    id: 10,
    name: "Quadriceps femoris",
    is_front: true,
    image_url_main: "/static/images/muscles/main/muscle-10.svg",
    image_url_secondary: "/static/images/muscles/secondary/muscle-10.svg",
  },
  {
    id: 6,
    name: "Rectus abdominis",
    is_front: true,
    image_url_main: "/static/images/muscles/main/muscle-6.svg",
    image_url_secondary: "/static/images/muscles/secondary/muscle-6.svg",
  },
  {
    id: 3,
    name: "Serratus anterior",
    is_front: true,
    image_url_main: "/static/images/muscles/main/muscle-3.svg",
    image_url_secondary: "/static/images/muscles/secondary/muscle-3.svg",
  },
  {
    id: 15,
    name: "Soleus",
    is_front: false,
    image_url_main: "/static/images/muscles/main/muscle-15.svg",
    image_url_secondary: "/static/images/muscles/secondary/muscle-15.svg",
  },
  {
    id: 9,
    name: "Trapezius",
    is_front: false,
    image_url_main: "/static/images/muscles/main/muscle-9.svg",
    image_url_secondary: "/static/images/muscles/secondary/muscle-9.svg",
  },
  {
    id: 5,
    name: "Triceps brachii",
    is_front: false,
    image_url_main: "/static/images/muscles/main/muscle-5.svg",
    image_url_secondary: "/static/images/muscles/secondary/muscle-5.svg",
  },
];

test("muscleNameExtractor returns a muscle group when a valid id is given", () => {
  expect(getMuscleName(muscleList, 3)).toBe("Serratus anterior");
  expect(getMuscleName(muscleList, 13)).toBe("Brachialis");
  expect(getMuscleName(muscleList, 2)).toBe("Anterior deltoid");
});

test("muscleNameExtractor returns undefined when an invalid id is given", () => {
  expect(getMuscleName(muscleList, 50)).toBe(undefined);
  expect(getMuscleName(muscleList, 72)).toBe(undefined);
  expect(getMuscleName(muscleList, 100)).toBe(undefined);
});
