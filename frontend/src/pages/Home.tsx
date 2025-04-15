import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UploadTab from "./UploadTab";
import VerifyTab from "./VerifyTab";
import HistoryTab from "./HistoryTab";

export default function Home() {
  return (
    <div className="min-h-screen flex items-start justify-center bg-muted/30 p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid grid-cols-3 w-full mb-6">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="verify">Verify</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="upload">
            <UploadTab />
          </TabsContent>
          <TabsContent value="verify">
            <VerifyTab />
          </TabsContent>
          <TabsContent value="history">
            <HistoryTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
