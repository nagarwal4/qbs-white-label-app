import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AlertDialog, Button, Toast } from "native-base";
import { Dispatch, SetStateAction, useRef } from "react";
import { cancelOffer } from "../api/offers/offers";
import Notification from "../components/Notification";
import { OffersStackParamList } from "../navigation/OffersStack";

type CancelOfferDialogProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  offerCode: string;
};

function CancelOfferDialog({
  isOpen,
  setIsOpen,
  offerCode,
}: CancelOfferDialogProps) {
  const cancelRef = useRef(null);
  const navigation = useNavigation<NavigationProp<OffersStackParamList>>();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: () => cancelOffer(offerCode),
    onSuccess() {
      Toast.show({
        render: () => (
          <Notification
            message="Offer cancelled successfully"
            variant="success"
            isToastNotification
          />
        ),
      });

      queryClient.invalidateQueries({ queryKey: ["offers", "Open"] });
      queryClient.invalidateQueries({ queryKey: ["offers", "Closed"] });

      navigation.goBack();
    },
    onError(error) {
      Toast.show({
        render: () => (
          <Notification
            message={
              error instanceof AxiosError
                ? error.response?.data.Errors[0].Message
                : error
            }
            variant="error"
            isToastNotification
          />
        ),
      });
    },
  });

  const onClose = () => setIsOpen(false);

  const handleCancelOffer = () => {
    // TODO mock code to delete the offer
    mutate();
  };

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>Cancel offer</AlertDialog.Header>
        <AlertDialog.Body>
          Are you sure you want to cancel this offer? It cannot be undone.
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button
              variant="unstyled"
              colorScheme="coolGray"
              onPress={onClose}
              ref={cancelRef}
            >
              Close
            </Button>
            <Button
              colorScheme="error"
              onPress={handleCancelOffer}
              isLoading={isLoading}
              isLoadingText="Canceling..."
            >
              Cancel offer
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
}

export default CancelOfferDialog;
