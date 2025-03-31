import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { Dialog, DialogContent, DialogFooter, DialogTitle } from '@/components/ui/dialog';

interface OrderStatusDialogProps {
  open: boolean;
  onClose: () => void;
  orderId: number;
  location: 'ms' | 'na' | 'eu';
}

const OrderStatusDialog = ({ open, onClose, orderId, location }: OrderStatusDialogProps) => {
  const [status, setStatus] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUpdateStatus = async () => {
    setIsLoading(true);
    try {
      const response = await axios.put(`http://localhost:8080/api/order/${location}/${orderId}`, { status });

      if (response.data.message) {
        toast.success(response.data.message);
        onClose();
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error || 'Lỗi khi cập nhật trạng thái');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Cập nhật trạng thái đơn hàng</DialogTitle>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Trạng thái</label>
            <select
              value={status}
              onChange={(e) => setStatus(Number(e.target.value))}
              className="mt-2 p-2 border border-gray-300 rounded-md"
            >
              <option value={1}>In Process</option>
              <option value={2}>Approved</option>
              <option value={3}>Backordered</option>
              <option value={4}>Rejected</option>
              <option value={5}>Shipped</option>
              <option value={6}>Cancelled</option>
            </select>
          </div>
        </div>
      </DialogContent>

      <DialogFooter>
        <Button variant="outline" onClick={onClose} disabled={isLoading}>
          Hủy
        </Button>
        <Button onClick={handleUpdateStatus} disabled={isLoading}>
          {isLoading ? 'Đang cập nhật...' : 'Cập nhật'}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default OrderStatusDialog;
