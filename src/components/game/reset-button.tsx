import { Button } from "../../components/ui/button";

interface ResetButtonProps {
  isResetting: boolean;
  onClick: () => void;
}

export const ResetButton = ({ isResetting, onClick }: ResetButtonProps) => (
  <Button
    onClick={onClick}
    className="mt-4"
    disabled={isResetting}
    variant="secondary"
  >
    {isResetting ? 'Resetting...' : 'Reset Game'}
  </Button>
);