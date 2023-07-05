import { Stack, Typography, Switch } from '@mui/material';
import { useThemeContext } from '../contexts/Theme.context';

function ThemeSwitcher() {
  const { colorMode, toggleColorMode } = useThemeContext()

    return (
        <Stack direction={'row'} spacing={2} alignItems='center'>
            <Typography>
                Light
            </Typography>
            <Switch
                checked={colorMode === 'dark'}
                onChange={() => toggleColorMode()}
            />
            <Typography>
                Dark
            </Typography>
        </Stack>
    )
}

export default ThemeSwitcher