import Api from "../utils/api";
import {handleUpdateGoal} from "./goals";

export const handleUploadToPresignedURL = (goal, filename, data) => {
  return dispatch => {
      Api.getPresignedGoalUrl(goal.id, filename)
        .then(res => {
          debugger;
          console.log('handleUploadToPresignedURL presigned data: ', res);
          const url = res.url;
          const fileUrl = res.filename;
          Api.uploadFileToAws(url, data)
            .then(() => {
              debugger;
              goal.image_url = fileUrl;
              dispatch(handleUpdateGoal(goal));
            })
            .catch(error => {
              console.group('Uploading File TO AWS Error');
              console.log('Failed upload file: ',filename);
              console.log('Failed upload URL: ', url);
              console.log('Upload error: ',error);
            })
        })
        .catch(error => {
          console.log('Unable to get presigned url: ',error);
        })
  }
};
