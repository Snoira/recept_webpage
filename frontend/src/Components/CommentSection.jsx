import { useComments } from "../Hooks/useComments";
import { useSession } from "../Hooks/useSession.js";
import { Formik, Form } from "formik";
import { TextAreaInput } from "./global/Inputs.jsx";
import * as Yup from 'yup';
import Button from "./global/Button.jsx";
import style from "../Styles/CommentSection.module.css"


const Comments = ({ comments, userId }) => {
    const { data: commentsData, isLoading } = comments;
    const { deleteComment } = useComments();

    if (isLoading) return <div>Loading...</div>
    if (!commentsData || commentsData.length === 0) return <div>No comments yet</div>

    return (
        <ul>
            {commentsData.map((comment, i) =>
                <li key={i}>
                    <div className={style.comment}>
                        <div className={style.commentTop}>
                            <p className={style.username}>{comment.user.username}</p>

                            {(userId === comment.user._id) &&
                                <Button
                                    variant="danger"
                                    size="small"
                                    icon="close"
                                    onClick={() => { deleteComment(comment._id) }} />
                            }
                        </div>
                        <p className={style.content}>{comment.content}</p>
                    </div>
                </li>
            )}
        </ul>
    )
}

const CommentSection = ({ recipeId }) => {
    const { user } = useSession()
    const { comments, postComment } = useComments(recipeId);


    const initialValues = { content: '' };

    const validationSchema = Yup.object({
        content: Yup.string().max(500, 'Max 500 characters')
            .trim()
            .test('must-have-account', 'You must be logged in to comment', () => !!user),
    }); 

    const isDisabled = ({ content }) => {
        return !user || content.trim() === "";
    }

    const handleSubmit = ({ content }) => {
        postComment(content);
    };

    console.log(comments.data && comments.data.length);
    return (
        <div>
            <div className={style.commentForm}>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ values }) => (
                        <Form >
                            <TextAreaInput
                                name="content"
                                placeholder="Berätta vad du tyckte"
                                span="full"
                            />
                            <Button
                                type="submit"
                                variant={isDisabled(values) ? "disabled" : "primary"}
                                disabled={isDisabled(values)}
                            >Posta kommentar</Button>
                        </Form>
                    )}
                </Formik>
            </div>
            <Comments comments={comments} userId={user?._id} />
        </div>
    )
};

export default CommentSection;
