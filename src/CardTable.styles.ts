export default {
  table: {
    width: '100%',
    borderCollapse: 'collapse' as 'collapse',
  },
  td: {
    padding: '5px 0',
  },
  activeRow: {
    backgroundColor: 'yellow',
  },
  light: {
    tr: {
      backgroundColor: '#ddd',
    },
    hover: {
      ':hover': {
        backgroundColor: 'lightblue',
      },
    }
  },
  dark: {
    tr: {
      backgroundColor: '#666',
    },
    hover: {
      ':hover': {
        backgroundColor: 'darkblue',
      },
    }
  },
};