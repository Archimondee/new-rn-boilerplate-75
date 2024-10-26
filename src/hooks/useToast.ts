import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useQuery, useQueryClient } from "@tanstack/react-query"


export const alert = createQueryKeys("alert", {
  alertState: () => ({
    queryKey: ["alertState"],
    queryFn: () => ({
      isVisible: false,
      text: "",
      icon: "",
      withIcon: false,
    }),
  }),
});

export const useToast = () => {
  const queryClient = useQueryClient()

  const updateAlertState = (partialState: Partial<any>) => {
    queryClient.setQueryData(alert.alertState().queryKey, (state: any) => ({
      ...state,
      ...partialState,
    }));
  };

  const alertStateQuery = useQuery({
    ...alert.alertState(),
    enabled: false,
  });

  return {
    alertState: alertStateQuery.data,
    alertActions: {
      toggleIsOpen: () => updateAlertState({ isVisible: !alertStateQuery.data?.isVisible }),
      toggleClose: () => updateAlertState({ isVisible: false }),
      showAlert: ({ text, icon, withIcon }: { text: string; icon: string; withIcon: boolean }) => {
        updateAlertState({
          text,
          icon,
          withIcon,
          isVisible: true,
        });
      },
    },
  };
}