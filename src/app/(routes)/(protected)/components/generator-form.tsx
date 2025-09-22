"use client";

import { type FormEvent, type FormEventHandler, useActionState, useOptimistic, useState } from 'react';
import { useAction } from "next-safe-action/hooks";
import { type State, refineRawReportAction } from './actions'
import { cn } from '@/lib/utils';

export default function Generator() {
    const [entryGained, setEntryGained] = useState('');
    const [introduction, setIntroduction] = useState('');
    const [customerLocation, setCustomerLocation] = useState('');
    const [supportCompleted, setSupportCompleted] = useState('');
    const [goalProgress, setGoalProgress] = useState('');
    const [issues, setIssues] = useState('');
    const [leavingLocation, setLeavingLocation] = useState('');
    const [otherInfo, setOtherInfo] = useState('');

    const [reportRawOutput, setReportRawOutput] = useState('');
    const [reportRefinedOutput, setReportRefinedOutput] = useState('');
    const [copyReportRawOutputNotification, setCopyReportRawOutputNotification] = useState(false);
    const [copyReportRefinedOutputNotification, setCopyReportRefinedOutputNotification] = useState(false);

    const generateReport = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        let reportText = '';

        reportText += `${entryGained}. ${introduction}. `;

        if (customerLocation) {
            reportText += `The customer was ${customerLocation} upon arrival. `;
        }
        if (supportCompleted) {
            reportText += `Support provided: ${supportCompleted}. `;
        }
        if (goalProgress) {
            reportText += `Progress towards goals: ${goalProgress}. `;
        }
        if (issues) {
            reportText += `Issues to report: ${issues}. `;
        }
        if (leavingLocation) {
            reportText += `Upon leaving, the customer was ${leavingLocation}. `;
        }
        if (otherInfo) {
            reportText += `Additional information: ${otherInfo}. `;
        }

        setReportRawOutput(reportText.trim());
        setReportRefinedOutput('');
    };

    const copyReportRaw = () => {
        const textToCopy = reportRawOutput;
        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopyReportRawOutputNotification(true);
            setTimeout(() => setCopyReportRawOutputNotification(false), 2000);
        });
    };

    const copyReportRefined = () => {
        const textToCopy = reportRefinedOutput;
        navigator.clipboard.writeText(textToCopy).then(() => {
            setCopyReportRefinedOutputNotification(true);
            setTimeout(() => setCopyReportRefinedOutputNotification(false), 2000);
        });
    };

    const { execute, result, reset, isPending } = useAction(refineRawReportAction);

    const generateReportButtonClassName = "min-h-8 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";
    const copyReportButtonClassName = "px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";
    const fieldClassName = "w-full p-2 rounded-md bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"

    return (
        <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 flex items-center justify-center p-4`}>
            <div className="container mx-auto max-w-4xl">
                {/* Header */}
                <header className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl sm:text-4xl font-bold text-center w-full">Care Assistant Report</h1>
                </header>

                {/* Main Form Card */}
                <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-6">Enter Visit Details</h2>
                    <form onSubmit={generateReport} className="space-y-6">

                        <div>
                            <label htmlFor="entryGained" className="block text-sm font-medium mb-1">How was entry gained?</label>
                            <input
                                id="entryGained"
                                list="entryGainedList"
                                value={entryGained}
                                onChange={(e) => setEntryGained(e.target.value)}
                                className={fieldClassName}
                                placeholder="Select or type how entry was gained"
                            />
                            <datalist id="entryGainedList">
                                <option>Key safe</option>
                                <option>Customer let me in</option>
                                <option>Another carer/family member</option>
                            </datalist>
                        </div>
                        <div>
                            <label htmlFor="introduction" className="block text-sm font-medium mb-1">Did you introduce yourself and show ID?</label>
                            <input
                                id="introduction"
                                list="introductionList"
                                value={introduction}
                                onChange={(e) => setIntroduction(e.target.value)}
                                className={fieldClassName}
                                placeholder="e.g., 'Introduced myself and ID badge shown.'"
                            />
                            <datalist id="introductionList">
                                <option>Introduced myself and ID badge shown</option>
                                <option>Have already met the customer</option>
                            </datalist>
                        </div>
                        <div>
                            <label htmlFor="customerLocation" className="block text-sm font-medium mb-1">Where was the customer upon arrival?</label>
                            <input type="text" id="customerLocation" list="customerLocationList" value={customerLocation} onChange={(e) => setCustomerLocation(e.target.value)} className={fieldClassName} placeholder="e.g., 'sitting in the living area', 'in bed', 'had already made herself soup and toast'" />
                            <datalist id="customerLocationList">
                                <option>answered the door</option>
                                <option>sitting in the living area</option>
                                <option>in the bathroom</option>
                                <option>in the bedroom</option>
                                <option>in bed</option>
                                <option>eating at the dining table</option>
                            </datalist>
                        </div>
                        <div>
                            <label htmlFor="supportCompleted" className="block text-sm font-medium mb-1">What support did you complete and what did you do together?</label>
                            <input type="text" id="supportCompleted" list="supportCompletedList" value={supportCompleted} onChange={(e) => setSupportCompleted(e.target.value)} className={fieldClassName} placeholder="e.g., 'assisted Margaret with her daily medication', 'made tea and toast.'" />
                            <datalist id="supportCompletedList">
                                <option>assisted with her daily medication needs</option>
                                <option>made food</option>
                                <option>carried out personal care needs</option>
                                <option>washed top half of body, assistance required to wash lower body</option>
                                <option>dressed in day clothes no support required</option>
                                <option>prepared meal of choice</option>
                                <option>prepared a warm drink</option>
                                <option>supported with continence care and changing into clean clothes</option>
                                <option>assisted with nutritional needs</option>
                                <option>helped with transferring food to dining table</option>
                                <option>supported with having a full body wash on the bed</option>
                                <option>supported them with having a full body wash on the bed</option>
                                <option>helped with their personal care needs</option>
                            </datalist>
                        </div>
                        <div>
                            <label htmlFor="goalProgress" className="block text-sm font-medium mb-1">How are they progressing towards goals set?</label>
                            <input id="goalProgress" list="goalProgressList" value={goalProgress} onChange={(e) => setGoalProgress(e.target.value)} className={fieldClassName} placeholder="e.g., 'Les is progressing well towards his goals.', 'Margaret has met this goal and is now independent with nutritional needs.'" />
                            <datalist id="goalProgressList">
                                <option>Les is progressing well towards his goals</option>
                                <option>Margaret has met this goal and is now independent with nutritional needs</option>
                                <option>Ann was able to wash her own face</option>
                                <option>All needs met before leaving</option>
                                <option>We discussed closing this call, Margaret agreed</option>
                            </datalist>
                        </div>
                        <div>
                            <label htmlFor="issues" className="block text-sm font-medium mb-1">Were there any issues to record/report?</label>
                            <input id="issues" list="issuesList" value={issues} onChange={(e) => setIssues(e.target.value)} className={fieldClassName} placeholder="e.g., 'Struggled to transfer food to dining table.'" />
                            <datalist id="issuesList">
                                <option>Struggled to transfer food to dining table</option>
                                <option>Needed assistance with personal care</option>
                                <option>Refused to participate in activity</option>
                            </datalist>
                        </div>
                        <div>
                            <label htmlFor="leavingLocation" className="block text-sm font-medium mb-1">Where was the customer upon leaving?</label>
                            <input id="leavingLocation" list="leavingLocationList" value={leavingLocation} onChange={(e) => setLeavingLocation(e.target.value)} className={fieldClassName} placeholder="e.g., 'watching television in the lounge.', 'sitting in living room eating his breakfast.'" />
                            <datalist id="leavingLocationList">
                                <option>watching television in the lounge</option>
                                <option>sitting in living room eating his breakfast</option>
                                <option>having her breakfast</option>
                                <option>in bed</option>
                                <option>in the dining area</option>
                            </datalist>
                        </div>
                        <div>
                            <label htmlFor="otherInfo" className="block text-sm font-medium mb-1">Any other important information? (e.g., wanted to cancel, had a visitor)</label>
                            <input id="otherInfo" list="otherInfoList" value={otherInfo} onChange={(e) => setOtherInfo(e.target.value)} className={fieldClassName} placeholder="e.g., 'Discussed closing this call, Margaret agreed.'" />
                            <datalist id="otherInfoList">
                                <option>Discussed closing this call, Margaret agreed</option>
                                <option>Les wanted to cancel his next appointment</option>
                                <option>Had a visitor during the session</option>
                            </datalist>
                        </div>

                        <div className="pt-4">
                            <button type="submit" className={generateReportButtonClassName}>
                                Generate Report
                            </button>
                        </div>
                    </form>
                </section>

                {reportRawOutput && (
                    <section id="reportRawContainer" className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                        <header className="flex justify-between items-center mb-4">
                            <h2 className="text-xl sm:text-2xl font-semibold">Generated Report</h2>
                            <button onClick={copyReportRaw} className={copyReportButtonClassName}>
                                Copy Raw Report
                            </button>
                        </header>
                        
                        <form action={execute}>
                            <textarea id="reportRawOutput" name="reportRawOutput" defaultValue={reportRawOutput} className={cn(fieldClassName, "field-sizing-content")}></textarea>
                            {copyReportRawOutputNotification && (
                                <div className="text-sm text-green-600 dark:text-green-400 mt-2 text-center font-medium">Report copied to clipboard!</div>
                            )}
                            
                            <footer className="pt-4">
                                <button className={generateReportButtonClassName} disabled={isPending}>
                                    {isPending ? (
                                        <div className="loading-spinner"></div>
                                    ) : (
                                        <span>Refine Report with AI</span>
                                    )}
                                </button>
                            </footer>
                        </form>
                    </section>
                )}

                {result.data && (
                    <section id="reportRefinedContainer" className="mt-6">
                        <header className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold mb-2">Refined Report</h2>
                            <button onClick={copyReportRefined} className={copyReportButtonClassName}>
                                Copy Refined Report
                            </button>
                        </header>
                        <output className={cn(fieldClassName, "block field-sizing-content")}>{result.data}</output>
                        {copyReportRefinedOutputNotification && (
                            <div className="text-sm text-green-600 dark:text-green-400 mt-2 text-center font-medium">Report copied to clipboard!</div>
                        )}
                    </section>
                )}

                {result.serverError && (
                    <section id="reportRefinedContainer" className="mt-6">
                        <header className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold mb-2">Refined Report Error</h2>
                        </header>
                        <output className={cn(fieldClassName, "block field-sizing-content")}>{result.serverError}</output>
                    </section>
                )}

                <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>Made for care assistants to simplify visit reporting.</p>
                </div>
            </div>
        </div>
    );
}
