import { useComments } from "../Hooks/useComments";
import { useSession } from "../Hooks/useSession.js";
import { Formik, Form } from "formik";
import { TextAreaInput } from "./global/Inputs.jsx";
import * as Yup from 'yup';
import Button from "./global/Button.jsx";
import style from "../Styles/CommentSection.module.css"


const CommentSection = ({ recipeId }) => {
    const { user } = useSession()
    const { comments, isLoading, postComment, deleteComment } = useComments(recipeId);


    const Comments = () => {
        if (isLoading) return <p>Loading comments...</p>
        if (!comments || comments.length === 0) return <p>No comments yet</p>
        return (
            <ul>
                {comments && comments.map((comment, i) =>
                    <li key={i}>
                        <div className={style.comment}>
                            <div className={style.commentTop}>
                                <p className={style.username}>{comment.user.username}</p>

                                {(user && comment.user._id === user._id) &&
                                    <Button variant="danger" size="small" icon="close" onClick={() => { deleteComment(comment._id) }}></Button>
                                }
                            </div>
                            <p className={style.content}>{comment.content}</p>
                        </div>
                    </li>
                )}
            </ul>
        )
    }

    const CommentField = () => {
        if (!user) return <p>Please log in to post a comment</p>

        const initialValues = { comment: '' };

        const validationSchema = Yup.object({
            comment: Yup.string().max(500, 'Max 500 characters')
                .trim()
                .test('must-have-account', 'You must be logged in to comment', () => !!user),
        });

        return (
            <div className={style.commentForm}>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={postComment}>
                    <Form >
                        <TextAreaInput name="comment" placeholder="Berätta vad du tyckte" disabled={!user} />
                        <Button type="submit">Posta kommentar</Button>
                    </Form>
                </Formik>
            </div>
        )
    }

    return (
        <div className={style.commentSection}>
            <CommentField />
            <Comments />
        </div>
    )
};

export default CommentSection;
