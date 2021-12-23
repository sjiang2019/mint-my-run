import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";

import { User, UserStats } from "../constants/models";
import StatsDataTable from "./StatsDataTable";

interface UserProfileProps {
  user: User;
  stats: UserStats;
}
export default function UserProfile({
  user,
  stats,
}: UserProfileProps): JSX.Element {
  return (
    <Card
      sx={{
        boxShadow: 2,
        paddingRight: 4,
        marginTop: 4,
        width: "300px",
        height: "350px",
        borderRadius: "12px",
        paddingBottom: 2,
        paddingTop: 2,
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            src={user.profileImageUrl}
            sx={{ height: 72, width: 72 }}
            aria-label="profile image"
          />
        }
        title={`${user.firstName} ${user.lastName}`}
        subheader={`@${user.username}`}
      />
      <CardContent>
        <StatsDataTable stats={stats} />
      </CardContent>
    </Card>
  );
}
