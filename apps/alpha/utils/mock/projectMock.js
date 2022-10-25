const SkillTreeShowFlag = {
  ChooseCategory: true,
  ChooseSubcategory: true,
  ChooseFocusArea: true,
  ChoosePriorities: true,
  ChooseSalary: true,
};

const priorities = {
  title: "Prioritise & distribute 100 points!",
  description:
    "Please distribute 100 points based on the priority, more points you give - more important the subject is to you.",
  priorities: {
    Experience: {
      description: "asdf",
      initialValue: "20",
    },
    Accountability: {
      description: "asdf",
      initialValue: "20",
    },
    "Skill Match": {
      description: "asdf",
      initialValue: "20",
    },
    Availability: {
      description: "asdf",
      initialValue: "20",
    },
  },
};

const proposedSalary = {
  title: "Proposed salary rates",
  description: "Based on the salary, choose the people you want to see",
  minSalary: "1",
  maxSarary: "80",
};

const SkillTree = {
  Design: {
    subCategories: [
      "UX/UI",
      "Graphic Design",
      "Web Design",
      "Animation",
      "General Design support from A-Z",
      "NFT Design",
      "Brand Design",
      "Other",
    ],
    "Niche Skills": [
      "Design Thinking",
      "User-Centered Design",
      "Agile",
      "Style Guides",
      "Other",
    ],
    "Knowledge of specific tools": [
      "Figma",
      "Sketch",
      "Figma",
      "Adobe Photoshop",
      "Adobe Illustrator",
      "3D Design Software",
      "Canva",
      "CorelDraw",
      "GIMP",
      "Affinity Designer",
      "Infinite Design",
      "Inkscape",
      "Other",
    ],
    "Values & Culture": [
      "Growth mindset",
      "Self-starter",
      "First Principles",
      "Teamwork",
      "Integrity",
      "Entrepreneurial",
      "Boldness",
      "Trust",
      "Accountability",
      "Passion",
      "Reliability",
      "Fun",
      "Honesty",
      "Other",
    ],
  },
  "Frontend Developer": {
    subCategories: [
      "UI Implementation",
      "Frontend Architecture",
      "General Frontend Support",
      "Web Development",
      "App Development",
    ],
    "Niche Skills": ["Typescript", "Javascript", "React", "Angular"],
    "Knowledge of specific tools": [
      "Jira",
      "Trello",
      "VC Code",
      "Version Control Software",
      "Other",
    ],
    "Values & Culture": [
      "Growth mindset",
      "Self-starter",
      "First Principles",
      "Teamwork",
      "Integrity",
      "Entrepreneurial",
      "Boldness",
      "Trust",
      "Accountability",
      "Passion",
      "Reliability",
      "Fun",
      "Honesty",
      "Other",
    ],
  },
  "Backend Developer": {
    subCategories: [
      "Architecture of your app",
      "Hard CS Stuff like Algo Dev & Data Structures",
      "AI & Data Science",
      "Blockchain & Smart Contract Stuff",
      "Other",
    ],
    "Niche Skills": [
      "Typescript",
      "Java",
      "MySQL",
      "Node.js",
      "Ruby",
      "Python",
      "Rust/C++",
      "GO",
      "Javascript",
      "Other",
    ],
    "Knowledge of specific tools": [
      "Jira",
      "Trello",
      "VC Code",
      "Version Control Software",
      "Other",
    ],
    "Values & Culture": [
      "Growth mindset",
      "Self-starter",
      "First Principles",
      "Teamwork",
      "Integrity",
      "Entrepreneurial",
      "Boldness",
      "Trust",
      "Accountability",
      "Passion",
      "Reliability",
      "Fun",
      "Honesty",
      "Other",
    ],
  },
  "Blockchain Developer": {
    subCategories: [
      "Smart Contract Development",
      "Smart Contract Auditing",
      "Blockchain Architecture & Design",
      "Lead a Technical Team",
    ],
    "Niche Skills": ["Solidity", "GO", "MOVE", "C++", "Rust", "Other"],
    "Knowledge of specific tools": [
      "Polygon",
      "Polkadot",
      "Celo",
      "Avalanche",
      "Ethereum",
      "Solana",
      "Cardano",
      "Binance Smart Chain",
      "Bitcoin",
      "Cosmos",
      "Other",
    ],
    "Values & Culture": [
      "Growth mindset",
      "Self-starter",
      "First Principles",
      "Teamwork",
      "Integrity",
      "Entrepreneurial",
      "Boldness",
      "Trust",
      "Accountability",
      "Passion",
      "Reliability",
      "Fun",
      "Honesty",
      "Other",
    ],
  },
  Product: {
    subCategories: [
      "User Research",
      "Market Research",
      "Technical Team Coordination",
      "Design Team Coordination",
      "Ideation",
      "Interviews",
      "UX/UI",
      "General PM Support building your product from A-Z",
      "Other",
    ],
    "Niche Skills": [
      "Quantitative Analysis",
      "Qualitative Analysis",
      "Report Creation",
      "Statistical Analysis",
      "A/B Testing",
      "Feature Discovery Techniques",
      "Agile",
      "Waterfall",
      "Spec Writing",
      "User Journey Mapping",
      "Persona Development",
      "User Stories",
      "Technical Spec Writing",
      "Product OKR Development",
      "Other",
    ],
    "Knowledge of specific tools": [
      "Figma",
      "Loom",
      "Zoom",
      "Illustrator",
      "Photoshop",
      "Canva",
      "Infinite Design",
      "Trello",
      "Jira",
      "Asana",
      "Other",
    ],
    "Values & Culture": [
      "Growth mindset",
      "Self-starter",
      "First Principles",
      "Teamwork",
      "Integrity",
      "Entrepreneurial",
      "Boldness",
      "Trust",
      "Accountability",
      "Passion",
      "Reliability",
      "Fun",
      "Honesty",
      "Other",
    ],
  },
};

const ResultCardShowFlag = {
  type: "Project", // Project,Bounty,DAO,User,discordChannel
  picture: true,
  description: true,
  skills: true,
  generalTags: true,
  champion: true,
  persentage: true,
  persentageButton: true,
};

const ResultPopUpShowFlag = {
  type: "Project", // Project,Bounty,DAO,User,discordChannel
  picture: true,
  description: true,
  skills: true,
  generalTags: true,
  champion: true,
  persentage: true,
  persentagewhButton: true,
};

const Result = [
  {
    description: "asdf",
    percentage: "75%",
    picture: "https://i.imgur.com/1Q9Z1Zm.png",
    name: "bluePanda",
    edenMembersDAO: "45",
    coreTeamPicture: [
      "https://i.imgur.com/1Q9Z1Zm.png",
      "https://i.imgur.com/1Q9Z1Zm.png",
      "https://i.imgur.com/1Q9Z1Zm.png",
      "https://i.imgur.com/1Q9Z1Zm.png",
      "https://i.imgur.com/1Q9Z1Zm.png",
    ],
    championPicture: "https://i.imgur.com/1Q9Z1Zm.png",
    roles: [
      {
        name: "scrum",
        percentage: "75%",
        "time:": "10 weeks",
        description: "asdf",
        "Open Seats": "2",
      },
      {
        name: "Agile",
        percentage: "50%",
        "time:": "10 weeks",
        description: "asdf",
        "Open Seats": "2",
      },
    ],
  },
  {
    description: "asdf",
    percentage: "75%",
    picture: "https://i.imgur.com/1Q9Z1Zm.png",
    name: "bluePanda",
    edenMembersDAO: "45",
    coreTeamPicture: [
      "https://i.imgur.com/1Q9Z1Zm.png",
      "https://i.imgur.com/1Q9Z1Zm.png",
      "https://i.imgur.com/1Q9Z1Zm.png",
      "https://i.imgur.com/1Q9Z1Zm.png",
      "https://i.imgur.com/1Q9Z1Zm.png",
    ],
    championPicture: "https://i.imgur.com/1Q9Z1Zm.png",
    roles: [
      {
        name: "scrum",
        percentage: "75%",
        "time:": "10 weeks",
        description: "asdf",
        "Open Seats": "2",
      },
      {
        name: "Agile",
        percentage: "50%",
        "time:": "10 weeks",
        description: "asdf",
        "Open Seats": "2",
      },
    ],
  },
];

const PROJECT_MOCK = {
  SkillTreeShowFlag: SkillTreeShowFlag,
  priorities: priorities,
  proposedSalary: proposedSalary,
  SkillTree: SkillTree,
  ResultCardShowFlag: ResultCardShowFlag,
  ResultPopUpShowFlag: ResultPopUpShowFlag,
  Result: Result,
};

export default PROJECT_MOCK;
