"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LucideCopy } from "lucide-react";
import { toast } from "sonner";

const AccountInfo = () => {
  const copyAccountInfo = ({
    accountNumber,
    bankName,
  }: {
    accountNumber: string;
    bankName: string;
  }) => {
    navigator.clipboard.writeText(accountNumber);
    toast.success(`${bankName} ${accountNumber} 계좌번호를 복사했어요!`);
  };

  return (
    <div className="flex flex-col items-center text-center px-6">
      <h2 className="text-2xl font-semibold mb-8">마음 전하기</h2>

      <div className="space-y-4 w-full max-w-md">
        <Card className="p-4 min-w-[20rem]">
          <div className="flex justify-between items-center space-x-4">
            <div className="flex-1 text-sm">
              <p className="text-left">
                <span className="mr-1">신랑</span>
                <strong>강재석</strong>
              </p>
              <p className="flex items-center gap-1 text-muted-foreground">
                농협 302 50553249 81
              </p>
            </div>
            <Button
              size="sm"
              className="mr-[-0.5rem]"
              variant="ghost"
              onClick={() =>
                copyAccountInfo({
                  accountNumber: "3025055324981",
                  bankName: "농협",
                })
              }
            >
              <LucideCopy />
              복사하기
            </Button>
          </div>
        </Card>
        <Card className="p-4 min-w-[20rem]">
          <div className="flex justify-between items-center space-x-4">
            <div className="flex-1 text-sm">
              <p className="text-left">
                <span className="mr-1">신부</span>
                <strong>김동희</strong>
              </p>
              <p className="flex items-center gap-1 text-muted-foreground">
                카카오뱅크 3333026930800
              </p>
            </div>
            <Button
              className="mr-[-0.5rem]"
              size="sm"
              variant="ghost"
              onClick={() => {
                copyAccountInfo({
                  accountNumber: "3333026930800",
                  bankName: "카카오뱅크",
                });
              }}
            >
              <LucideCopy />
              복사하기
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AccountInfo;
