export const testNotification = (user: any) => {
  return {
    data: {
      type: 'test',
      message: `This is a test notification for ${user.firstName}`,
    },
  }
}
