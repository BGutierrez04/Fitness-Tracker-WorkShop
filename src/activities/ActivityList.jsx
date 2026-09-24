import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { deleteActivity } from "../api/activities";

export default function ActivityList({ activities, syncActivities }) {
  const { token } = useAuth();
  const [error, setError] = useState(null);

  const tryDeleteActivity = async (id) => {
    setError(null);

    try {
      await deleteActivity(token, id);
      syncActivities();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            {activity.name}

            {token && (
              <button onClick={() => tryDeleteActivity(activity.id)}>
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>

      {error && <p role="alert">{error}</p>}
    </>
  );
}
