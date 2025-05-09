#include <iostream>
#include <string>

class CatalystAIChatAgent {
public:
    void displayIntroduction() {
        std::cout << "CatalystAI 2025 — Official Build\n"
                     "Engineered, Developed, and Designed by Neksha DeSilva\n"
                     "Licensed under Apache-2.0 Contributor's License\n\n";
    }

    void displayDescription() {
        std::cout << "CatalystAI 2025 is a cutting-edge AI-assisted academic reasoning framework, "
                     "purpose-built to analyze, interpret, and generate deep, context-aware engagement with uploaded documents.\n"
                     "Leveraging the power of Gemini Pro, LangChain, and AstraDB, it operates as an intelligent assistant, "
                     "educator, and evaluator — delivering comprehensive academic analysis through both textual and voice-driven interactions.\n\n";
    }

    void displayFeatures() {
        std::cout << "Feature Set Overview:\n"
                     "1. Document Completion Engine\n"
                     "   - Real-time tracking of document engagement.\n"
                     "   - Completion Score representing coverage and relevance.\n"
                     "2. Accuracy Scoring + Deep Semantic Search\n"
                     "   - Fidelity evaluation of AI-generated answers.\n"
                     "   - Dynamic activation of Deep Search Mode.\n"
                     "3. Expert Mode – Interactive Auto-Assessment\n"
                     "   - Generates intelligent questions and answers.\n"
                     "   - Supports exam preparation and critical evaluation.\n"
                     "4. Dual Interaction Modes\n"
                     "   - Power Assistant-GPT Mode and Document Answering Mode.\n"
                     "5. Speech Recognition & Microphone Input\n"
                     "   - Voice-to-text conversion and spoken prompt understanding.\n"
                     "6. Structured Chat Export (JSON Format)\n"
                     "   - Exportable sessions with metadata and scores.\n"
                     "7. Persistent Chat History Storage\n"
                     "   - Tracks learning progress and supports re-assessment.\n\n";
    }

    void displayExampleWorkflow() {
        std::cout << "Example Workflow:\n"
                     "A postgraduate student uploads a 6000-word dissertation on neural cryptography.\n"
                     "CatalystAI:\n"
                     "- Parses the document and calculates a Completion Score of 82%.\n"
                     "- Measures an Accuracy Score of 94%.\n"
                     "- Activates Expert Mode, generating 12 questions and answers from the methodology section.\n"
                     "- Exports the session as a .json file for review and fine-tuning.\n\n";
    }

    void displayTechnologyStack() {
        std::cout << "Technology Stack:\n"
                     "Gemini Pro (via LangChain): NLU, semantic validation, and generative tasks.\n"
                     "LangChain PromptTemplate: Prompt building and contextual memory handling.\n"
                     "AstraDB: Document storage, indexing, and metadata control.\n"
                     "JavaScript + HTML/CSS: Frontend interaction and voice input handling.\n"
                     "JSON Exporter: Archival and export generation.\n"
                     "Web Speech API: Voice input integration.\n\n";
    }

    void displayLicense() {
        std::cout << "License:\n"
                     "Apache-2.0 — Contributor’s License Edition\n"
                     "You are free to fork, build, and deploy CatalystAI for non-commercial or research purposes.\n"
                     "For redistribution or monetization, a contributor citation and license retention is required.\n\n";
    }

    void startChat() {
        std::cout << "Welcome to CatalystAI! How can I assist you today?\n";
        std::string userInput;

        // Simulating a simple chat loop
        while (true) {
            std::cout << "> ";
            std::getline(std::cin, userInput);

            if (userInput == "exit" || userInput == "quit") {
                std::cout << "Goodbye! Thank you for using CatalystAI.\n";
                break;
            } else if (userInput.find("features") != std::string::npos) {
                displayFeatures();
            } else if (userInput.find("workflow") != std::string::npos) {
                displayExampleWorkflow();
            } else if (userInput.find("technology") != std::string::npos) {
                displayTechnologyStack();
            } else if (userInput.find("license") != std::string::npos) {
                displayLicense();
            } else {
                std::cout << "I'm sorry, I didn't quite understand that. Please ask about features, workflow, technology, or license.\n";
            }
        }
    }
};

int main() {
    CatalystAIChatAgent aiAgent;

    aiAgent.displayIntroduction();
    aiAgent.displayDescription();
    aiAgent.startChat();

    return 0;
}
