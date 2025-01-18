import { useState, useEffect } from "react";
import {globals} from '@/api/api';
interface EmailType {
    from: string;
    subject: string;
    body: string;
}

export default function Email({ goToHome }: { goToHome: () => void }) {
    const [currentEmail, setCurrentEmail] = useState<EmailType | null>(null);
    const [emails, setEmails] = useState<EmailType[]>([]);

    useEffect(() => {
        const e = globals.emails;
        if (e) {
            const fetchedEmails = e.map((email: any) => ({
                from: email.sender,
                subject: email.subject,
                body: email.message,
            }));
            setEmails(fetchedEmails);
        } else {
            // Fallback to hardcoded emails if globals.emails is not available
            setEmails([
                {
                    from: "john@example.com",
                    subject: "Hello, World!",
                    body: "This is a test email with a long body...",
                },
                {
                    from: "jane@example.com",
                    subject: "Hi there!",
                    body: "This is a shorter test email.",
                },
            ]);
        }
    }, []);

    const formatBody = (body: string) => {
        const paragraphs = body.split(/\n\s*\n/);
    
        return paragraphs.map((paragraph, index) => (
            <div key={index}>
                {paragraph.split("\n").map((line, lineIndex) => (
                    <p key={lineIndex}>{line}</p>
                ))}
            </div>
        ));
    };

    return (
        <div className="flex flex-col h-screen">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-blue-500 text-white">
                <button onClick={goToHome} className="text-white">
                    Back
                </button>
                <h1 className="text-lg font-bold">Emails</h1>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-1/4 border-r overflow-y-auto">
                    <ul className="divide-y">
                        {emails.map((email, index) => (
                            <li 
                                key={index}
                                onClick={() => setCurrentEmail(email)}
                                className={`p-4 cursor-pointer hover:bg-gray-100 ${
                                    currentEmail === email ? 'bg-blue-50' : ''
                                }`}
                            >
                                <p className="font-medium truncate">{email.from}</p>
                                <p className="text-gray-600 truncate">{email.subject}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
                        {currentEmail ? (
                            <div className="space-y-4">
                                <div className="bg-white border rounded-lg p-6 shadow-sm">
                                    <p className="font-bold">From: {currentEmail.from}</p>
                                    <p className="font-bold mt-2">Subject: {currentEmail.subject}</p>
                                    <div className="mt-6 text-gray-700">
                                        {formatBody(currentEmail.body)}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-500">
                                Select an email to view
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}