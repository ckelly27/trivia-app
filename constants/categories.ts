export interface TriviaCategory {
  id: number;
  name: string;
  endpoint: string;
}

export const triviaCategories: TriviaCategory[] = [
  { id: 8, name: "All Categories", endpoint: "https://opentdb.com/api.php?amount=10" },
  { id: 9, name: "General Knowledge", endpoint: "https://opentdb.com/api.php?amount=10&category=9" },
  { id: 10, name: "Entertainment: Books", endpoint: "https://opentdb.com/api.php?amount=10&category=10" },
  { id: 11, name: "Entertainment: Film", endpoint: "https://opentdb.com/api.php?amount=10&category=11" },
  { id: 12, name: "Entertainment: Music", endpoint: "https://opentdb.com/api.php?amount=10&category=12" },
  { id: 13, name: "Entertainment: Musicals & Theatres", endpoint: "https://opentdb.com/api.php?amount=10&category=13" },
  { id: 14, name: "Entertainment: Television", endpoint: "https://opentdb.com/api.php?amount=10&category=14" },
  { id: 15, name: "Entertainment: Video Games", endpoint: "https://opentdb.com/api.php?amount=10&category=15" },
  { id: 16, name: "Entertainment: Board Games", endpoint: "https://opentdb.com/api.php?amount=10&category=16" },
  { id: 17, name: "Science & Nature", endpoint: "https://opentdb.com/api.php?amount=10&category=17" },
  { id: 18, name: "Science: Computers", endpoint: "https://opentdb.com/api.php?amount=10&category=18" },
  { id: 19, name: "Science: Mathematics", endpoint: "https://opentdb.com/api.php?amount=10&category=19" },
  { id: 20, name: "Mythology", endpoint: "https://opentdb.com/api.php?amount=10&category=20" },
  { id: 21, name: "Sports", endpoint: "https://opentdb.com/api.php?amount=10&category=21" },
  { id: 22, name: "Geography", endpoint: "https://opentdb.com/api.php?amount=10&category=22" },
  { id: 23, name: "History", endpoint: "https://opentdb.com/api.php?amount=10&category=23" },
  { id: 24, name: "Politics", endpoint: "https://opentdb.com/api.php?amount=10&category=24" },
  { id: 25, name: "Art", endpoint: "https://opentdb.com/api.php?amount=10&category=25" },
  { id: 26, name: "Celebrities", endpoint: "https://opentdb.com/api.php?amount=10&category=26" },
  { id: 27, name: "Animals", endpoint: "https://opentdb.com/api.php?amount=10&category=27" },
  { id: 28, name: "Vehicles", endpoint: "https://opentdb.com/api.php?amount=10&category=28" },
  { id: 29, name: "Entertainment: Comics", endpoint: "https://opentdb.com/api.php?amount=10&category=29" },
  { id: 30, name: "Science: Gadgets", endpoint: "https://opentdb.com/api.php?amount=10&category=30" },
  { id: 31, name: "Entertainment: Japanese Anime & Manga", endpoint: "https://opentdb.com/api.php?amount=10&category=31" },
  { id: 32, name: "Entertainment: Cartoon & Animations", endpoint: "https://opentdb.com/api.php?amount=10&category=32" },
];
