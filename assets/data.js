/* =============================================================
   SITE DATA  —  edit this file to update your site content.
   Publications and news are rendered from the arrays below by
   assets/main.js, so the home page and publications page always
   stay in sync.
   ============================================================= */

/* ---- Profile / identity (edit freely) ---------------------- */
const PROFILE = {
  name: "Sammy Sharief",
  // Short tagline under your name on the hero
  tagline: "I build statistical & machine-learning methods to make sense of the Universe.",
  // Rotating words typed out in the hero
  roles: ["Astrophysics", "Machine Learning", "Inverse Problems", "Uncertainty Quantification"],
  affiliation: "PhD in Physics · Université Paris-Saclay",
  location: "Paris, France",
  // Social / academic links — replace any "#" with your real URL
  links: {
    email: "mailto:sammy.sharief@universite-paris-saclay.fr",
    scholar: "#",            // TODO: Google Scholar profile URL
    arxiv: "#",              // TODO: arXiv author page URL
    github: "https://github.com/SammyS15",
    linkedin: "https://www.linkedin.com/in/SammyS15",
    twitter: "#",            // TODO: X / Twitter (or delete this line)
  },
};

/* ---- Research interests (home page cards) ------------------ */
const INTERESTS = [
  {
    icon: "wave",
    title: "High-Dimensional Inverse Problems",
    text: "Recovering signals from noisy, ill-posed measurements where the unknowns vastly outnumber clean constraints.",
  },
  {
    icon: "chart",
    title: "Generative Models & Uncertainty",
    text: "Designing principled, sample-based metrics to evaluate generative and conditional distributions, and to quantify uncertainty.",
  },
  {
    icon: "telescope",
    title: "Cosmology",
    text: "Field-level analyses of cosmological N-body simulations.",
  },
  {
    icon: "galaxy",
    title: "Strong Gravitational Lensing",
    text: "Using lensed systems as cosmic telescopes and probes of dark matter, and reconstructing source galaxies from distorted images.",
  },
  //   {
  //   icon: "telescope",
  //   title: "Transients",
  //   text: "Type Ia supernovae and Hubble residuals",
  // },
];

/* ---- News / updates (home page feed) ----------------------- */
const NEWS = [
  { date: "May 2026", html: "<strong>MIRA: A score for conditional distribution accuracy and model comparison</strong> accepted to <strong>ICML 2026</strong> as a Spotlight paper." },
  { date: "Dec 2025", html: "Started my <strong>PhD in Physics</strong> at Université Paris-Saclay with François Lanusse, Tobias Liaudat &amp; Samuel Farrens." },
  { date: "Sep 2025", html: "Completed my <strong>M.Sc.</strong> at the University of Montréal (advisor: Laurence Perreault-Levasseur)." },
  { date: "May 2025", html: "Awarded an <strong>MSCA COFUND Doctoral Fellowship</strong> through the <strong>DeMythif.AI</strong> programme at Université Paris-Saclay." },
  { date: "Apr 2025", html: "Presented <strong>PQMass</strong> at <strong>ICLR 2025</strong> in Singapore." },
];

/* ---- Publications -----------------------------------------------
   Mark your name with **double asterisks** to bold it in the author
   list. Set role: "first" or "cofirst" to show an authorship badge.
   Add code/project links to the `links` object as you collect them.
   ----------------------------------------------------------------- */
const PUBLICATIONS = [
  {
    id: "2605.02014",
    title: "MIRA: A Score for Conditional Distribution Accuracy and Model Comparison",
    authors: "**Sammy Sharief**, Justine Zeghal, Gabriel Missael Barco, Pablo Lemos, Yashar Hezaveh, Laurence Perreault-Levasseur",
    venue: "ICML 2026",
    year: 2026,
    role: "first",
    spotlight: true,
    selected: true,
    tags: ["Machine Learning", "Generative Models", "Inverse Problems"],
    abstract: "MIRA introduces a sample-based scoring metric for evaluating conditional distributions. Relying on the principle that distributions coincide if they assign equal probability mass to all regions, the framework enables Bayesian model comparison without explicit evidence computation.",
    links: { arxiv: "https://arxiv.org/abs/2605.02014", pdf: "https://arxiv.org/pdf/2605.02014" },
  },
  {
    id: "thesis-2025",
    title: "Uncertainty Quantification Metrics for Scientific Applications",
    authors: "**Sammy Sharief**",
    venue: "M.Sc. Thesis · U. Montréal",
    year: 2025,
    role: "first",
    selected: false,
    tags: ["Statistics", "Machine Learning"],
    abstract: "My master's thesis develops and benchmarks metrics for uncertainty quantification in scientific machine learning, unifying the probability-mass ideas behind PQMass and posterior-accuracy scoring. (Short summary — edit as needed.)",
    links: {},
  },
  {
    id: "pokie-2025",
    title: "Pokie: Posterior Accuracy and Model Comparison",
    authors: "**Sammy Sharief**, et al.",
    venue: "ML4Astro @ ICML 2025",
    year: 2025,
    role: "first",
    selected: false,
    tags: ["Machine Learning", "Statistics"],
    abstract: "Pokie introduces diagnostics for posterior accuracy and Bayesian model comparison in simulation-based inference, extending probability-mass tests to validate inferred posteriors. (Short summary — edit as needed.)",
    links: {},
  },
  {
    id: "2505.13620",
    title: "Field-Level Comparison and Robustness Analysis of Cosmological N-body Simulations",
    authors: "Adrian E. Bayer, Francisco Villaescusa-Navarro, **Sammy Sharief**, Romain Teyssier, Lehman H. Garrison, Laurence Perreault-Levasseur, Greg L. Bryan, Marco Gatti, Eli Visbal",
    venue: "Submitted (AAS)",
    year: 2025,
    role: null,
    selected: true,
    tags: ["Cosmology", "Machine Learning"],
    abstract: "The first field-level comparison of cosmological N-body simulations across multiple codes. The analysis employs statistical methods and neural networks to identify resolution effects and simulation inconsistencies that affect cosmological inference.",
    links: { arxiv: "https://arxiv.org/abs/2505.13620", pdf: "https://arxiv.org/pdf/2505.13620" },
  },
  {
    id: "2402.04355",
    title: "PQMass: Probabilistic Assessment of the Quality of Generative Models using Probability Mass Estimation",
    authors: "Pablo Lemos, **Sammy Sharief**, Nikolay Malkin, Salma Salhi, Connor Stone, Laurence Perreault-Levasseur, Yashar Hezaveh",
    venue: "ICLR 2025",
    year: 2025,
    role: "cofirst",
    selected: true,
    tags: ["Machine Learning", "Generative Models"],
    abstract: "A likelihood-free approach for evaluating generative models by comparing two distributions. PQMass divides the sample space into non-overlapping regions and applies chi-squared tests to assess quality without auxiliary models or density assumptions, exposing failure modes of metrics such as FID and FLD.",
    links: { arxiv: "https://arxiv.org/abs/2402.04355", pdf: "https://arxiv.org/pdf/2402.04355" },
  },
  {
    id: "2401.02926",
    title: "Searching for Bumps in the Cosmological Road: Do Type Ia Supernovae with Early Excesses Have Biased Hubble Residuals?",
    authors: "Christine Ye, David O. Jones, Willem B. Hoogendam, Benjamin J. Shappee, Suhail Dhawan, **Sammy N. Sharief**",
    venue: "ApJ",
    year: 2024,
    role: null,
    selected: false,
    tags: ["Supernovae", "Cosmology"],
    abstract: "A systematic search for early-time flux excesses in Type Ia supernovae observed by the Zwicky Transient Facility, testing whether supernovae exhibiting these excesses show systematically different Hubble residuals compared to the standard population.",
    links: { arxiv: "https://arxiv.org/abs/2401.02926", pdf: "https://arxiv.org/pdf/2401.02926" },
  },
  {
    id: "2211.07128",
    title: "The Young Supernova Experiment Data Release 1 (YSE DR1): Light Curves and Photometric Classification of 1975 Supernovae",
    authors: "Patrick D. Aleo, Konstantin Malanchev, **Sammy Sharief**, David O. Jones, Gautham Narayan, Ryan J. Foley, V. Ashley Villar, et al.",
    venue: "ApJ",
    year: 2023,
    role: null,
    selected: true,
    tags: ["Supernovae", "Machine Learning"],
    abstract: "YSE DR1 presents processed photometry of 1975 transients with classifications and redshifts, combining Pan-STARRS1 and Zwicky Transient Facility observations to train the ParSNIP and SuperRAENN photometric classification algorithms.",
    links: { arxiv: "https://arxiv.org/abs/2211.07128", pdf: "https://arxiv.org/pdf/2211.07128" },
  },
  {
    id: "2211.05134",
    title: "SN 2022ann: A Type Icn Supernova from a Dwarf Galaxy that Reveals Helium in its Circumstellar Environment",
    authors: "K. W. Davis, K. Taggart, S. Tinyanont, R. J. Foley, V. A. Villar, …, **S. N. Sharief**, et al.",
    venue: "ApJ",
    year: 2022,
    role: null,
    selected: false,
    tags: ["Supernovae"],
    abstract: "A study of SN 2022ann, a rare Type Icn supernova hosted in a dwarf galaxy. Its spectra reveal helium in the circumstellar environment, offering a window into the mass-loss history of the progenitor before explosion.",
    links: { arxiv: "https://arxiv.org/abs/2211.05134", pdf: "https://arxiv.org/pdf/2211.05134" },
  },
];
