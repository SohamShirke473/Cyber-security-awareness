document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
        
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Quiz Functionality
    const quizData = [
        {
            question: "What should you do if you receive a call asking for your UPI PIN?",
            options: [
                "Share the PIN to verify your identity",
                "Hang up and report to the cyber helpline",
                "Ask for their credentials first",
                "Provide a different PIN"
            ],
            correct: 1,
            explanation: "Never share your UPI PIN with anyone. Legitimate organizations do not ask for PINs over calls."
        },
        {
            question: "You receive an SMS with a link to update your KYC details. What’s the safest action?",
            options: [
                "Click the link and update immediately",
                "Verify with your bank using official contact details",
                "Forward the SMS to a friend for advice",
                "Ignore it but don’t report it"
            ],
            correct: 1,
            explanation: "Always verify such requests directly with your bank using official contact numbers or websites, not links from unsolicited messages."
        },
        {
            question: "A job offer asks for a registration fee before starting work. This is likely:",
            options: [
                "A standard hiring process",
                "A legitimate remote work opportunity",
                "A job scam",
                "A government recruitment drive"
            ],
            correct: 2,
            explanation: "Legitimate employers do not ask for upfront fees for jobs. Such requests are common in job scams."
        },
        {
            question: "An app promises 20% monthly returns on investments. What should you do?",
            options: [
                "Invest a small amount to test it",
                "Check if it’s listed on official app stores",
                "Share it with friends to earn bonuses",
                "Report it as a potential scam"
            ],
            correct: 3,
            explanation: "Promises of high, guaranteed returns are a red flag for scams. Report suspicious apps to authorities."
        },
        {
            question: "You get a text saying you’ve won a lottery you never entered. What’s the best response?",
            options: [
                "Click the link to claim the prize",
                "Reply to confirm your identity",
                "Delete the message and report it",
                "Call the number to verify"
            ],
            correct: 2,
            explanation: "Unsolicited prize notifications are often SMS scams. Delete them and report to cyber authorities."
        },
        {
            question: "A government scheme asks for a processing fee to receive benefits. You should:",
            options: [
                "Pay the fee to secure benefits",
                "Check official government websites",
                "Share your details to register",
                "Ask for a refund policy first"
            ],
            correct: 1,
            explanation: "Government benefits don’t require processing fees. Verify schemes on official government portals."
        },
        {
            question: "You notice a suspicious card reader at an ATM. What’s the best action?",
            options: [
                "Use the ATM but check your account later",
                "Report it to the bank immediately",
                "Pull off the card reader yourself",
                "Take a photo and post it online"
            ],
            correct: 1,
            explanation: "Suspicious card readers may be skimming devices. Report to the bank without using the ATM."
        },
        {
            question: "Someone you met online asks for money due to an emergency. What should you do?",
            options: [
                "Send money to help them",
                "Ask for more details about the emergency",
                "Verify their identity independently",
                "Block them without responding"
            ],
            correct: 2,
            explanation: "Romance scams often involve fake emergencies. Verify the person’s identity before taking any action."
        },
        {
            question: "An email asks you to update your bank details urgently. What’s the safest step?",
            options: [
                "Click the link and update details",
                "Call your bank using the official number",
                "Reply to the email with your details",
                "Ignore it but don’t verify"
            ],
            correct: 1,
            explanation: "Never click links in unsolicited emails. Contact your bank directly using verified contact information."
        },
        {
            question: "What’s a key sign of a phishing website?",
            options: [
                "It has a professional design",
                "The URL doesn’t match the official site",
                "It offers free downloads",
                "It loads quickly"
            ],
            correct: 1,
            explanation: "Phishing websites often use URLs that mimic but don’t match the official site’s address."
        }
    ];

    const quizSection = document.querySelector('.quiz-section');
    if (quizSection) {
        const startBtn = document.getElementById('start-quiz');
        const quizStart = document.getElementById('quiz-start');
        const quizQuestions = document.getElementById('quiz-questions');
        const questionContainer = document.getElementById('question-container');
        const optionsContainer = document.getElementById('options-container');
        const nextBtn = document.getElementById('next-btn');
        const quizResults = document.getElementById('quiz-results');
        const scoreValue = document.getElementById('score-value');
        const scoreMessage = document.getElementById('score-message');
        const scoreExplanation = document.getElementById('score-explanation');
        const retryBtn = document.getElementById('retry-quiz');
        const progressFill = document.getElementById('progress-fill');
        const questionCounter = document.getElementById('question-counter');

        let currentQuestion = 0;
        let score = 0;

        startBtn.addEventListener('click', () => {
            quizStart.classList.remove('active');
            quizQuestions.classList.add('active');
            loadQuestion();
        });

        function loadQuestion() {
            const q = quizData[currentQuestion];
            questionContainer.innerHTML = `<h3>${q.question}</h3>`;
            optionsContainer.innerHTML = '';
            q.options.forEach((option, index) => {
                const btn = document.createElement('button');
                btn.classList.add('option-btn');
                btn.innerText = option;
                btn.addEventListener('click', () => selectOption(index));
                optionsContainer.appendChild(btn);
            });
            updateProgress();
            nextBtn.disabled = true;
        }

        function selectOption(index) {
            const q = quizData[currentQuestion];
            const buttons = optionsContainer.querySelectorAll('.option-btn');
            buttons.forEach(btn => btn.disabled = true);
            if (index === q.correct) {
                buttons[index].classList.add('correct');
                score++;
            } else {
                buttons[index].classList.add('incorrect');
                buttons[q.correct].classList.add('correct');
            }
            nextBtn.disabled = false;
        }

        nextBtn.addEventListener('click', () => {
            currentQuestion++;
            if (currentQuestion < quizData.length) {
                loadQuestion();
            } else {
                showResults();
            }
        });

        function updateProgress() {
            const progress = ((currentQuestion + 1) / quizData.length) * 100;
            progressFill.style.width = `${progress}%`;
            questionCounter.innerText = `Question ${currentQuestion + 1}/${quizData.length}`;
        }

        function showResults() {
            quizQuestions.classList.remove('active');
            quizResults.classList.add('active');
            scoreValue.innerText = score;
            const percentage = (score / quizData.length) * 100;
            scoreMessage.innerText = percentage >= 80 ? 
                "Excellent! You're well-prepared against scams." :
                percentage >= 50 ? 
                "Good effort! Review some areas to stay safer." :
                "Needs improvement. Explore our resources to learn more.";
            scoreExplanation.innerHTML = quizData.map((q, i) => `
                <p><strong>Question ${i + 1}:</strong> ${q.explanation}</p>
            `).join('');
        }

        retryBtn.addEventListener('click', () => {
            currentQuestion = 0;
            score = 0;
            quizResults.classList.remove('active');
            quizQuestions.classList.add('active');
            loadQuestion();
        });
    }

    // Stories Search
    const storiesSection = document.querySelector('.stories-section');
    if (storiesSection) {
        const searchInput = document.getElementById('storySearch');
        const searchBtn = document.getElementById('searchBtn');
        const storiesContainer = document.getElementById('storiesContainer');

        // Stories data
const stories = [
    {
        title: "The OTP Trap: How a Simple Code Led to a ₹50,000 Loss",
        source: "NDTV - Common Financial Frauds in India",
        link: "https://www.ndtv.com/india-news/common-financial-frauds-in-india-how-to-stay-safe-5099757",
        story: "Ravi, a college student in Pune, received a call from someone claiming to be from his bank’s fraud department. The caller warned him about an unauthorized transaction and asked him to share an OTP. In panic, Ravi complied. Moments later, ₹50,000 vanished from his account.\n\nPrecaution: Never share OTPs. Always verify suspicious calls with the bank's official number. Report immediately.",
        category: "OTP Scam"
    },
    {
        title: "Sextortion Scam: A Flirtatious Chat Turned Nightmare",
        source: "Reddit – Common Scams in India",
        link: "https://www.reddit.com/r/india/comments/15shvmp/some_common_scams_happening_in_india_and_how_to/?rdt=39538",
        story: "Ankit, 19, chatted with a stranger on Instagram. She later convinced him to join a video call and encouraged him to undress-secretly recording him. She demanded ₹10,000, threatening to release the video.\n\nPrecaution: Avoid engaging with strangers in intimate conversations. Report such blackmail to platforms and via the Cybercrime Portal.",
        category: "Sextortion Scam"
    },
    {
        title: "The Fake Job Offer: When a Dream Opportunity Becomes a Trap",
        source: "FTC – Job Scams",
        link: "https://www.ftc.gov/news-events/data-visualizations/data-spotlight/2022/12/who-experiences-scams-story-all-ages",
        story: "Priya received an offer letter from a reputed-sounding company. Everything looked legitimate until she was asked to pay ₹2,500 for visa processing. After paying, the company vanished.\n\nPrecaution: Real companies don’t charge upfront. Verify jobs through trusted platforms and official websites before paying or sending personal data.",
        category: "Job Scam"
    },
    {
        title: "The Investment Scam: When Quick Returns Lead to Big Losses",
        source: "FTC – Investment Scams",
        link: "https://www.ftc.gov/news-events/data-visualizations/data-spotlight/2022/12/who-experiences-scams-story-all-ages",
        story: "Rahul joined a Telegram group promoting crypto investments. He initially received a small return, then invested more. The group disappeared-with his ₹1 lakh.\n\nPrecaution: Avoid schemes with guaranteed returns. Stick to SEBI-regulated platforms and consult financial advisors before investing.",
        category: "Investment Scam"
    },
    {
        title: "The KBC Lottery Scam: The Prize That Never Existed",
        source: "5paisa – Top Financial Scams in India",
        link: "https://www.5paisa.com/finschool/financial-scams-why-investors-need-to-be-vigilant/",
        story: "Sunita received a call claiming she had won ₹25 lakh in the 'KBC Lottery.' She was told to pay ₹15,000 as a processing fee. After transferring the amount, the caller vanished and she never received any prize.\n\nPrecaution: Never pay fees for lottery winnings. Legitimate lotteries do not ask for money upfront. Verify claims directly with official sources.",
        category: "Lottery Scam"
    },
    {
        title: "The Chit Fund Collapse: Community Savings Wiped Out",
        source: "5paisa – Top Financial Scams in India",
        link: "https://www.5paisa.com/finschool/financial-scams-why-investors-need-to-be-vigilant/",
        story: "A group of neighbors in Kolkata invested in a chit fund promising high returns. Months later, the organizer disappeared with all the pooled money, leaving dozens of families in financial distress.\n\nPrecaution: Invest only in government-registered financial schemes. Avoid informal or unregulated savings groups.",
        category: "Chit Fund Scam"
    },
    {
        title: "SIM Swap Fraud: When Your Phone Number Gets Hijacked",
        source: "5paisa – Top Financial Scams in India",
        link: "https://www.5paisa.com/finschool/financial-scams-why-investors-need-to-be-vigilant/",
        story: "Vikram suddenly lost network connectivity on his phone. Soon after, he received alerts for unauthorized bank transactions. Scammers had obtained a duplicate SIM and accessed his bank OTPs, draining his account.\n\nPrecaution: If your phone loses signal unexpectedly, contact your telecom provider immediately. Enable additional authentication for banking services.",
        category: "SIM Swap Scam"
    },
    {
        title: "Phishing Email: The Fake Bank Alert",
        source: "5paisa – Top Financial Scams in India",
        link: "https://www.5paisa.com/finschool/financial-scams-why-investors-need-to-be-vigilant/",
        story: "Aman received an urgent email appearing to be from his bank, asking him to verify his account by clicking a link. He entered his credentials, only to find his account emptied the next day.\n\nPrecaution: Never click on suspicious email links or share banking details online. Always access your bank’s website directly.",
        category: "Phishing Scam"
    },
    {
        title: "Ponzi Scheme Trap: High Returns, No Principal",
        source: "5paisa – Top Financial Scams in India",
        link: "https://www.5paisa.com/finschool/financial-scams-why-investors-need-to-be-vigilant/",
        story: "Many villagers in Assam invested in a scheme that promised to double their money in a year. Early investors got paid, but when new deposits slowed, the organizer disappeared, leaving hundreds with nothing.\n\nPrecaution: Be wary of investment schemes that promise unusually high or guaranteed returns. Check if the scheme is registered with SEBI or RBI.",
        category: "Ponzi Scheme"
    }
];


        function loadStories(filter = '') {
            storiesContainer.innerHTML = '';
            const filteredStories = stories.filter(story => 
                story.title.toLowerCase().includes(filter.toLowerCase()) ||
                story.story.toLowerCase().includes(filter.toLowerCase()) ||
                story.category.toLowerCase().includes(filter.toLowerCase())
            );
            if (filteredStories.length === 0) {
                storiesContainer.innerHTML = '<p>No stories found matching your search.</p>';
                return;
            }
            filteredStories.forEach(story => {
                const storyCard = document.createElement('div');
                storyCard.classList.add('story-card');
                storyCard.innerHTML = `
                    <h3>${story.title}</h3>
                    <p>${story.story.split('\n\n')[0]}</p>
                    <p><strong>Precaution:</strong> ${story.story.split('\n\n')[1].replace('Precaution: ', '')}</p>
                    <p><strong>Source:</strong> <a href="${story.link}" target="_blank">${story.source}</a></p>
                    <span class="category">${story.category}</span>
                `;
                storiesContainer.appendChild(storyCard);
            });
        }

        loadStories();

        searchBtn.addEventListener('click', () => {
            loadStories(searchInput.value);
        });

        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                loadStories(searchInput.value);
            }
        });
    }

    // Resource Filter
    const resourceSection = document.querySelector('.resources-grid');
    if (resourceSection) {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const resourceItems = document.querySelectorAll('.resource-item');

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.getAttribute('data-filter');
                
                resourceItems.forEach(item => {
                    if (filter === 'all' || item.classList.contains(filter)) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
});
