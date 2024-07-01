export default interface JobPostProps {
    jobPostId: number;
    postDate: Date;
    authorName: string;
    authorId: number;
    profilePictureURL: string;
    category: string;
    title: string;
    description: string;
    images: string[];
}