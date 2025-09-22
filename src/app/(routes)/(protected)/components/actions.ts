'use server'

import { GoogleGenAI } from "@google/genai";
import { z } from 'zod';
import { zfd } from "zod-form-data";

import { actionClient } from "@/lib/safe-action";

export type State = {
    reportRawOutput: string
}

const inputSchema = zfd.formData({
    reportRawOutput: zfd.text(z.string().min(1).max(640)),
});

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const refineRawReportAction = actionClient
    .inputSchema(inputSchema)
    .action(async ({ parsedInput: { reportRawOutput } }) => {
        console.log({ reportRawOutput })
        try {
            const systemInstruction = "Act as a professional care report editor for an vulnerable care service to support indivduals in regaining their independence. Your task is to correct grammar and spelling, and rephrase the input to match the tone and style of the provided examples. The report should be concise, professional and clear, and should use industry-specific, professional terms. Avoid language that labels, demeans, or stereotypes the individual. Avoid generalizing and describe specific behaviors. Avoid providing diagnoses for someone; instead, describe the observed behaviors, Avoid exaggerating or embellishing, and write as if the individual may read the report. Do not add any new information, only refine what is given. Example 1: Gained entry via Key safe, support plan read. Introduced myself and ID badge shown. Les was sitting in the living area upon arrival. Les independently walked to the bathroom, where we carried out personal care needs. Les washed top half of body, assistance required to wash lower body. Les dressed in day clothes no support required with this. Les walked to the kitchen and prepared meat of choice, I prepared a warm drink. Les struggled to transfer food to dining table. Upon leaving Les was sitting in living room on dining table eating his breakfast. Les is progressing well towards his goals. Example 2: Margaret let me in, introduced myself and showed ID badge. Margaret had already made herself soup and toast before my arrival. From looking back at previous visit logs, it appears Margaret has met this goal and is now independent with nutritional needs. Therefore we discussed closing this call, Margaret agreed. I followed this up by notifying NOK, office and the TA. / left Margaret watching television in the lounge. Example 3: Pete and I met outside the property, gained entry via keysafe. We greeted Ann in the lounge, Ann remembered us both from yesterday. Pete and I supported"

            const contents = `Refine the following care assistant report: ${reportRawOutput}.`;

            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents,
                config: {
                    systemInstruction
                },
            });
            console.log(response.text);

            return response.text;
        } catch (error) {
            console.error("Failed to generate refined report:", error);
            throw error;
        }
    });