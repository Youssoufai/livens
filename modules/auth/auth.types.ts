export interface ResetTimerProps {
  startTime?: number
  value: string
  onUpdatePressed?: (value: boolean) => void
  onResend: (value: string) => Promise<NetworkResponse<undefined> | undefined>
}

export enum OnboardingStatus {
  in_progress = 'IN_PROGRESS',
  completed = 'COMPLETED',
}
