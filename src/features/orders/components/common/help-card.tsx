import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HelpCard() {
  return (
    <Card className="bg-orange-50 border-orange-100 gap-2">
      <CardHeader>
        <CardTitle className="text-lg">Butuh Bantuan?</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">
          Jika Anda memiliki pertanyaan atau kendala terkait pesanan, tim
          layanan pelanggan kami siap membantu.
        </p>
        <Button className="w-full bg-orange-500 hover:bg-orange-600">
          Hubungi Customer Service
        </Button>
      </CardContent>
    </Card>
  );
}
