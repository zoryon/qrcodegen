"use client";

import { useQrCodeCreator } from "@/contexts/createQRCodesContext";
import VCardForm from "./QRCodeForms/VCardForm";
import { useEffect } from "react";
import { useQrCodeList } from "@/contexts/qrCodesListContext";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const Step2 = () => {
    const { handlePrev, qrType, created, reset } = useQrCodeCreator();
    const { refreshQrCodesList } = useQrCodeList();
    const router = useRouter();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (created !== true) return;

        refreshQrCodesList();
        router.push("/");

        setTimeout(reset, 1000);
    }, [created])

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-100 mb-2">Configure {qrType}</h1>
                <p className="text-gray-400">Fill in the details for your QR code</p>
            </div>

            <div className="space-y-6">
                {qrType === "vCard" && <VCardForm />}
            </div>

            <div className="flex justify-between">
                <Button
                    variant="ghost"
                    onClick={() => handlePrev()}
                    className="text-gray-400 hover:text-gray-300"
                >
                    <i className="fas fa-arrow-left mr-2" />
                    Back
                </Button>
                <Button
                    type="submit"
                    form={qrType?.toLowerCase() + "-form"}
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                >
                    Create Code
                    <i className="fas fa-bolt ml-2" />
                </Button>
            </div>
        </div>
    );
};

export default Step2;