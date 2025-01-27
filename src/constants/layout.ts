export const layout = {
    borderRadius: {
      small: 4,
      medium: 8,
      large: 12,
      extraLarge: 16,
    },
    padding: {
      extraSmall: 4,
      small: 8,
      medium: 12,
      large: 16,
      extraLarge: 24,
      huge: 32,
    },
    height: {
      button: 48,
      textInput: 48,
      chart: 257
    },
    fontSize: {
      extraSmall: 12,
      small: 14,
      medium: 16,
      large: 18,
      extraLarge: 20,
    },
    shadow: {
      small: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
    },
    width: {
      modal: '90%',
      maxModal: 400,
    },
  } as const;