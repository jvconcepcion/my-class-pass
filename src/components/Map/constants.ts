import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

export const StyledButton = styled(Button)(({ theme }) => ({
  borderColor: theme.palette.grey[200],
  borderWidth: 1,
  borderStyle: 'solid',
}));