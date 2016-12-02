export const VIDEO_GET_DETAILS = "video/get_details";

export function getVideoDetails(videoId) {
	return {
		type: VIDEO_GET_DETAILS,
		payload: {
			videoId: videoId
		}
	};
}

