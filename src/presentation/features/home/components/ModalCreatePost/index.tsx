import { Avatar, Box, TextField, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { Editor } from "@tinymce/tinymce-react";
import {
  ModalContainer,
  StyledSelect,
  StyledSelectMenu,
  StyledSelectItem,
  StyledBottomActions,
  StyledButtonShare,
  StyledBaseFeeContainer,
  EditorContainer,
} from "./styles";
import {
  ArrowDownIcon,
  CloseIcon,
  PaperClipIcon,
  PictureIcon,
  TagUserIcon,
  TextBoldIcon,
  TextItalicIcon,
  TextUnderlineIcon,
  TextsStrikethroughIcon,
} from "src/presentation/theme/assets/icons";
import { POST_OPTIONS } from "src/common/constants";
import CustomButton from "src/presentation/components/button";
import COLOR from "src/presentation/theme/Color";
import { useAppSelector } from "src/data/redux/Hooks";
import { stringAvatar } from "src/common/utils";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface IProps {
  editorRef: any;
  open: boolean;
  loading: boolean;
  onToggleModal: () => void;
  option: any;
  openOptionSelect: any;
  basePrice: any;
  onToggleSelect: any;
  onSelectMenu: any;
  setBasePrice: any;
  handleSharePost: any;
  setEditor: any;
}

const ModalCreatePost = (props: IProps) => {
  const { open, editorRef, onToggleModal, setEditor } = props;
  const { profile } = useAppSelector((state) => state.auth);

  const renderPostOptions = () => (
    <Box className="relative">
      <StyledSelect
        className="post-option__dropdown flex-center"
        onClick={props.onToggleSelect}
      >
        <Typography className="post-option__name">
          {props.option.title}
        </Typography>
        <ArrowDownIcon />
      </StyledSelect>
      {props.openOptionSelect && (
        <StyledSelectMenu>
          {POST_OPTIONS.map((option) => (
            <StyledSelectItem
              className="post-option__dropdown"
              onClick={() => props.onSelectMenu(option)}
            >
              <Typography className="post-title__title">
                {option.title}
              </Typography>
            </StyledSelectItem>
          ))}
        </StyledSelectMenu>
      )}
    </Box>
  );

  const renderBaseFeeInput = () => (
    <StyledBaseFeeContainer className="flex-center">
      <Typography className="action__title">Base Price</Typography>
      <Box className="action__input-container flex-center">
        <TextField
          value={props.basePrice}
          onChange={(e) => props.setBasePrice(e.target.value)}
          placeholder="0"
        />
        <Typography className="fee__symbol">AVAX</Typography>
      </Box>
    </StyledBaseFeeContainer>
  );

  return (
    <Modal
      open={open}
      onClose={onToggleModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ zIndex: 10 }}
    >
      <ModalContainer>
        <Box className="modal-header flex-center">
          <Typography className="modal-header__title">Create post</Typography>
          <Box className="modal-header__action">
            <CloseIcon onClick={onToggleModal} />
          </Box>
        </Box>
        <Box className="modal-information flex-center">
          {profile?.avatarUrl ? (
            <img
              src={profile?.avatarUrl}
              alt="avatar"
              className="modal-information__avatar"
            />
          ) : (
            <Avatar
              {...stringAvatar(profile?.username)}
              className="modal-information__avatar"
            />
          )}
          <Box className="modal-information__create">
            <Typography className="modal-information__name">
              {profile?.username}
            </Typography>
            {renderPostOptions()}
          </Box>
        </Box>

        <EditorContainer>
          {/* <Editor
            apiKey={process.env.REACT_APP_EDITOR_API_KEY}
            onInit={(evt, editor) => (editorRef.current = editor)}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family: Gilroy; line-height: 22px; color: #031D3C }",
            }}
          /> */}
          <ReactQuill
            theme="snow"
            value={editorRef}
            formats={[
              "header",
              "font",
              "size",
              "bold",
              "italic",
              "underline",
              "strike",
              "blockquote",
              "list",
              "bullet",
              "indent",
              "align",
            ]}
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ size: [] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                  { list: "ordered" },
                  { list: "bullet" },
                  { indent: "-1" },
                  { indent: "+1" },
                ],
                [{ align: [] }],
              ],
            }}
            onChange={setEditor}
          />
        </EditorContainer>

        {/* <StyledBottomActions className="flex-center">
          <Typography className="action__title">Add to you post</Typography>
          <Box className="bottom__attachs flex-center">
            <Box className="bottom__attach-item">
              <TextBoldIcon />
            </Box>
            <Box className="bottom__attach-item">
              <TextItalicIcon />
            </Box>
            <Box className="bottom__attach-item">
              <TextUnderlineIcon />
            </Box>
            <Box className="bottom__attach-item">
              <TextsStrikethroughIcon />
            </Box>
            <Box className="bottom__attach-item">
              <PictureIcon />
            </Box>
            <Box className="bottom__attach-item">
              <PaperClipIcon />
            </Box>
            <Box className="bottom__attach-item">
              <TagUserIcon />
            </Box>
          </Box>
        </StyledBottomActions> */}
        {props.option.id === 0 && renderBaseFeeInput()}
        <StyledButtonShare>
          <CustomButton
            title="Share"
            loading={props.loading}
            backgroundColor={COLOR.linear}
            variant={"contained"}
            onClick={props.handleSharePost}
          />
        </StyledButtonShare>
      </ModalContainer>
    </Modal>
  );
};

export default ModalCreatePost;
