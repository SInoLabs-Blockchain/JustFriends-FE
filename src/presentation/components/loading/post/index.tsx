import { CardContent, CardHeader, Typography, Skeleton } from "@mui/material";

import { PostContainer, PostSection } from "./styles";

const PostLoading = () => {
  return (
    <PostSection>
      <PostContainer>
        <CardHeader
          avatar={
            <Skeleton
              animation="wave"
              variant="rounded"
              width={44}
              height={44}
            />
          }
          title={<Skeleton />}
          subheader={<Skeleton />}
        />
        <CardContent>
          <Typography className="content">
            <Skeleton height={120} />
          </Typography>
        </CardContent>
      </PostContainer>
    </PostSection>
  );
};

export default PostLoading;
