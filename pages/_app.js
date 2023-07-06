import GlobalStyle from "../styles";

const goals = [
  {
    id: 1,
    name: "Walking",
    category: "Sport",
    description: "I want to take a walk after lunch or dinner",
    icon: "/icons/icons8-woman-walking-48.png",
  },
  {
    id: 2,
    name: "Yoga",
    category: "Sport",
    description: "I want to do yoga",
    icon: "/icons/icons8-woman-in-lotus-position-48.png",
  },
  {
    id: 3,
    name: "Gym",
    category: "Sport",
    description: "I want to go to the gym",
    icon: "/icons/icons8-person-lifting-weights-48.png",
  },
  {
    id: 4,
    name: "Sleep",
    category: "Health",
    description: "I want to get min 8 hours of sleep",
    icon: "/icons/icons8-first-quarter-moon-face-48.png",
  },
  {
    id: 5,
    name: "Diet",
    category: "Health",
    description: "I want to eat fruits and veggies",
    icon: "/icons/icons8-brokkoli-48.png",
  },
  {
    id: 6,
    name: "Water",
    category: "Health",
    description: "I want to drink min 2l of water",
    icon: "/icons/icons8-droplet-48.png",
  },
  {
    id: 7,
    name: "Reading",
    category: "Learning",
    description: "I want to read a chapter in a book",
    icon: "/icons/icons8-books-emoji-48.png",
  },
  {
    id: 8,
    name: "Volunteering",
    category: "Social",
    description: "I want to volunteer at an NGO",
    icon: "/icons/icons8-palms-up-together-48.png",
  },
  {
    id: 9,
    name: "Family",
    category: "Family",
    description: "I want to host a movie night with family",
    icon: "/icons/icons8-film-projector-48.png",
  },
  {
    id: 10,
    name: "Parents",
    category: "Family",
    description: "I want to call my parents",
    icon: "/icons/icons8-old-woman-medium-light-skin-tone-48.png",
  },
];

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} goals={goals} />
    </>
  );
}
