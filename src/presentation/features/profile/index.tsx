import { Box, Typography } from '@mui/material';
import CustomButton from 'src/presentation/components/button';
import COLOR from 'src/presentation/theme/Color';
import { DollarIcon, EducationIcon } from 'src/presentation/theme/assets/icons';
import {
  BackgroundProfileImg,
  Container,
  LeftContent,
  RightContent,
} from './styles';

const Profile = () => {
  const renderContent = () => (
    <Box className='profile__content-container'>
      <LeftContent>
        <Box className='user-information-container'>
          <Box className='user-information__content'>
            <Typography className='user-information__name'>
              Jerry Kane
            </Typography>
            <Box className='user-information__content-container flex-center'>
              <EducationIcon />
              <Typography className='user-information__content-title'>
                Credit score: <span>1900</span>
              </Typography>
            </Box>
            <Box className='user-information__content-container flex-center'>
              <DollarIcon />
              <Typography className='user-information__content-title'>
                Total earn: <span>100 KLAY</span>
              </Typography>
            </Box>
          </Box>
          <Typography className='user-information__description'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
          <Box className='user-information__metrics-container flex-center'>
            <Box className='user-information__metrics-item flex-center'>
              <Typography className='user-information__metrics-value'>
                11 K
              </Typography>
              <Typography className='user-information__metrics-title'>
                Following
              </Typography>
            </Box>
            <Box className='user-information__metrics-item flex-center'>
              <Typography className='user-information__metrics-value'>
                11 K
              </Typography>
              <Typography className='user-information__metrics-title'>
                Follower
              </Typography>
            </Box>
            <Box className='user-information__metrics-item flex-center'>
              <Typography className='user-information__metrics-value'>
                11
              </Typography>
              <Typography className='user-information__metrics-title'>
                Posts
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box className='user-information__button'>
          <CustomButton title='Edit Profile' backgroundColor={COLOR.linear} />
        </Box>
      </LeftContent>
      <RightContent></RightContent>
    </Box>
  );

  return (
    <Container>
      <BackgroundProfileImg>
        <img
          src={require('src/presentation/theme/assets/images/background.png')}
          alt=''
        />
        <Box className='profile__avatar-container'>
          <img
            src={
              'https://upload.wikimedia.org/wikipedia/commons/1/1b/Trump_SQ.png'
            }
            alt=''
          />
        </Box>
      </BackgroundProfileImg>

      {renderContent()}
    </Container>
  );
};

export default Profile;
