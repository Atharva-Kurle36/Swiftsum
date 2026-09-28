export interface IksFact {
  id: string;
  category: 'Mathematics' | 'Astronomy' | 'Algorithms' | 'Geometry' | 'Linguistics';
  title: string;
  sanskritVerse?: string;
  verseTranslation?: string;
  description: string;
  treatise: string;
  author: string;
  era: string;
  significance: string;
}

export const IKS_FACTS: IksFact[] = [
  {
    id: 'sulba-pythagoras',
    category: 'Geometry',
    title: 'The Sulba Sutra Theorem (Centuries Before Pythagoras)',
    sanskritVerse: 'Dirghachaturasrasyakshnaya rajjuh parshvamani tiryagmani cha yatprithagbhute kurutastadubhayam karoti.',
    verseTranslation: 'The diagonal rope of an oblong produces both which the flank and the horizontal produce separately.',
    description: 'Baudhayana Sulba Sutra explicitly formulated the geometric theorem of right-angled triangles and irrational square roots (√2 accurate to 5 decimals) centuries before Pythagoras of Samos.',
    treatise: 'Baudhayana Sulba Sutra (Shloka 1.48)',
    author: 'Acharya Baudhayana',
    era: 'c. 800 BCE',
    significance: 'First recorded geometric proof and systematic table of right-angled triangles in world history.'
  },
  {
    id: 'pingala-binary',
    category: 'Algorithms',
    title: 'The Origin of the Binary System & Meru Prastara',
    sanskritVerse: 'Dvirardhe rupe shunyam.',
    verseTranslation: 'Halve the number; when halved write two, when odd subtract one and write zero.',
    description: 'Acharya Pingala classified Vedic poetic meters using Laghu (short = 1) and Guru (long = 0) syllables, inventing the binary number system, binomial coefficients, and the Meru Prastara (known in the West as Pascal\'s Triangle) 1,800 years early.',
    treatise: 'Chandas Shastra',
    author: 'Acharya Pingala',
    era: 'c. 300 BCE',
    significance: 'Precursor to computer science binary representation, combinatorics, and power-of-two algorithms.'
  },
  {
    id: 'aryabhata-pi-earth',
    category: 'Astronomy',
    title: 'Precision Value of π & Earth’s Axial Rotation',
    sanskritVerse: 'Chaturadhikam shatamashtagunam dvashashtistatha sahasranam | Ayutadvayavishkambhasyasanno vrittaparinahah.',
    verseTranslation: 'Add 4 to 100, multiply by 8, and add 62,000. This is the approximate circumference of a circle of diameter 20,000.',
    description: 'Aryabhata computed π as 62,832 / 20,000 = 3.1416, explicitly labeling it as "Asanna" (approximated / irrational). He also posited that the Earth rotates on its own axis relative to stationary stars.',
    treatise: 'Aryabhatiya (Ganitapada 10)',
    author: 'Aryabhata',
    era: '499 CE',
    significance: 'Earliest explicit recognition of π as an irrational approximation and heliocentric planetary models.'
  },
  {
    id: 'brahmagupta-zero',
    category: 'Mathematics',
    title: 'The Formal Arithmetic Rules of Zero & Negative Numbers',
    sanskritVerse: 'Rinam dhanayorghatah rinam, dhanayordhanam, rinayordhanam.',
    verseTranslation: 'The product of negative and positive is negative; of two positives is positive; of two negatives is positive.',
    description: 'Brahmagupta was the first mathematician in world history to establish zero (Shunya) as a number in its own right with formal algebraic laws for addition, subtraction, multiplication, and quadratic solutions.',
    treatise: 'Brahmasphutasiddhanta',
    author: 'Brahmagupta',
    era: '628 CE',
    significance: 'Foundation of modern world arithmetic, negative debt/fortune (Rina & Dhana), and quadratic algebra.'
  },
  {
    id: 'madhava-calculus',
    category: 'Mathematics',
    title: 'Infinite Series for Trigonometry & Calculus (Kerala School)',
    sanskritVerse: 'Vyase varidhinihate rupahrite vyasasagarabhihate | Trisharadivisham samkhyabhaktamrinam swam prithak kramat kuryat.',
    verseTranslation: 'Multiply diameter by 4, divide by 1, then alternate adding and subtracting diameter times 4 divided by odd numbers 3, 5, 7...',
    description: 'Madhava of Sangamagrama founded the Kerala School of Astronomy and discovered the infinite series for arctangent, sine, cosine, and π (the Madhava-Leibniz series) nearly 300 years before Newton and Leibniz.',
    treatise: 'Yukthibhasha / Karanapaddhati',
    author: 'Madhava of Sangamagrama',
    era: 'c. 1350 – 1425 CE',
    significance: 'The birth of mathematical analysis, power series expansions, and early differential calculus.'
  },
  {
    id: 'katapayadi-cipher',
    category: 'Linguistics',
    title: 'The Katapayadi Alphanumeric Hashing System',
    sanskritVerse: 'Kadirnava tadirnava padipancha yakadyashtau jnah shunyam.',
    verseTranslation: 'Consonants starting from Ka, Ta, Pa, Ya denote digits 1-9; Jña denotes zero.',
    description: 'Ancient Indian scholars encoded huge numerical constants, planetary orbital periods, and sine tables into memorizable, melodious Sanskrit devotional verses using a deterministic cipher called Katapayadi.',
    treatise: 'Sadratnamala & Vararuchi’s Vakyas',
    author: 'Vararuchi & Kerala Astronomers',
    era: 'c. 4th Century CE',
    significance: 'Early algorithmic data compression, mnemonic encryption, and mathematical poetry.'
  },
  {
    id: 'bhaskara-lilavati',
    category: 'Mathematics',
    title: 'Lilavati: Playful & Poetic High-Order Algebra',
    sanskritVerse: 'Aye bale lilavati pralolalochane ganite chaturyam asti chet kathaya.',
    verseTranslation: 'O playful maiden Lilavati with gazelle eyes, if you have skill in arithmetic, answer this problem!',
    description: 'Bhaskara II composed Lilavati as a pedagogical masterpiece for his daughter, disguising complex permutations, quadratic indeterminate equations (Chakravala method), and geometric series as riddles about bees, swans, and lotus flowers.',
    treatise: 'Siddhanta Shiromani (Lilavati)',
    author: 'Bhaskaracharya (Bhaskara II)',
    era: '1150 CE',
    significance: 'Demonstrates the IKS pedagogical philosophy: rigorous mathematics taught through joy and inquiry.'
  },
  {
    id: 'chakravala-algorithm',
    category: 'Algorithms',
    title: 'The Chakravala Cyclic Method for Pell’s Equation',
    description: 'Centuries before Euler and Lagrange investigated Nx² + 1 = y², Acharya Jayadeva and Bhaskara II developed the cyclic Chakravala algorithm to systematically find integer solutions to indeterminate quadratic equations in mere minutes.',
    treatise: 'Bijaganita',
    author: 'Acharya Jayadeva & Bhaskara II',
    era: 'c. 1000 – 1150 CE',
    significance: 'Hermann Hankel called it "the finest thing achieved in the theory of numbers before Lagrange."'
  },
  {
    id: 'panini-formal-grammar',
    category: 'Algorithms',
    title: 'Panini’s Ashtadhyayi: The World’s First Formal Grammar',
    description: 'Panini formulated 3,959 generative rules for Sanskrit using auxiliary symbols, context-sensitive markers, recursion, and meta-rules. Modern computer scientists (including Backus and Naur) recognized this as the Backus-Naur Form (BNF) used in programming languages.',
    treatise: 'Ashtadhyayi',
    author: 'Acharya Panini',
    era: 'c. 5th Century BCE',
    significance: 'The foundational precursor to formal language theory, computer compilers, and algorithmic grammar.'
  },
  {
    id: 'vedic-crosswise-speed',
    category: 'Mathematics',
    title: 'Urdhva-Tiryagbhyam: Parallelized Mental Arithmetic',
    sanskritVerse: 'Urdhva-Tiryagbhyam.',
    verseTranslation: 'Vertically and crosswise.',
    description: 'Unlike standard western column multiplication which processes each digit row separately and requires multi-line addition, Urdhva-Tiryagbhyam computes all cross-products in a single step from right to left, dramatically reducing cognitive memory load.',
    treatise: 'Vedic Mathematics',
    author: 'Swami Bharati Krishna Tirtha',
    era: 'Published 1965 (oral Vedic tradition)',
    significance: 'Directly applicable in high-speed hardware multiplier architectures for VLSI digital signal processing.'
  }
];
