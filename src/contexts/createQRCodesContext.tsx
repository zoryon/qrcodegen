"use client";

import { QRCodeTypes, VCardQRCode } from "@/types/QRCodeType";
import { createContext, useContext, useState } from "react"

type VCardData = Omit<VCardQRCode, 'type' | 'qrCodeId'>;
type DesignOptions = {
    color: string;
    logo: File | null;
};

type QrCreatorContextType = {
    step: number,
    setStep: React.Dispatch<React.SetStateAction<number>>,
    qrType: QRCodeTypes,
    setQrType: React.Dispatch<React.SetStateAction<QRCodeTypes>>,
    vCardData: VCardData,
    setVCardData: React.Dispatch<React.SetStateAction<VCardData>>,
    designOptions: DesignOptions,
    setDesignOptions: React.Dispatch<React.SetStateAction<DesignOptions>>,
    created: boolean,
    setCreated: React.Dispatch<React.SetStateAction<boolean>>,
    reset: () => void
}

const initialVCardData: VCardData = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    websiteUrl: "",
    address: ""
};

const initialDesignOptions: DesignOptions = {
    color: "#000000",
    logo: null
};

export const QrCreatorContext = createContext<QrCreatorContextType>(null!);

export function QrCreatorProvider({ children }: { children: React.ReactNode }) {
    const [step, setStep] = useState<number>(1);
    const [qrType, setQrType] = useState<QRCodeTypes>("vCard");
    const [created, setCreated] = useState<boolean>(false);
    const [vCardData, setVCardData] = useState<VCardData>(initialVCardData);
    const [designOptions, setDesignOptions] = useState<DesignOptions>(initialDesignOptions);

    function reset() {
        setCreated(false);
        setStep(1);
        setQrType("vCard");
        setVCardData(initialVCardData);
        setDesignOptions(initialDesignOptions);
    }

    return (
        <QrCreatorContext.Provider value={{
            step, setStep,
            qrType, setQrType,
            vCardData, setVCardData,
            designOptions, setDesignOptions,
            created, setCreated,
            reset
        }}>
            {children}
        </QrCreatorContext.Provider>
    );
}

export function useQrCodeCreator() {
    return useContext(QrCreatorContext);
}