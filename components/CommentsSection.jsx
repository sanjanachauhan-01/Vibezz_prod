import React, { useEffect, useRef, useState} from 'react';
import { View, Text, Modal, TouchableOpacity, FlatList, Image, StyleSheet, RefreshControl, TextInput } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { addComment, AddCommentReplys, fetchCommentReplys, fetchComments } from '../lib/appwrite';
import EmptyState from './EmptyState';
import useAppwrite from '../lib/useAppwrite';
import { ScrollView } from 'react-native-gesture-handler';

const CommentsSection = ({ postID, userID, avatar, username, comments, refetch }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [modalMarginTop, setModalMarginTop] = useState('130%');
  const [commentID, setCommentID] = useState('');
  const [textInputValue, setTextInputValue] = useState('');
  const textInputRef = useRef(null);
  const[replies, setReplies] = useState(false);
  const[replytoComment, setReplyToComment] = useState(false);
  const[commentReplyID , setCommentReplyID] = useState('');
  const { data: commentRepliesArray } = useAppwrite(fetchCommentReplys,commentReplyID);
  const [reloading, setReloading] = useState(false);

console.log(commentRepliesArray)

//to show if there is a section called reply.
const showTheReplySection = (replySection,commentReplyID) => {
  setReplies((replies) => !replies);
  setReplyToComment(true);
  setCommentReplyID(commentReplyID);
};

const handleCommentReplies = (commentReplyID) => {
  setReplyToComment(true);
  setCommentReplyID(commentReplyID);
};


  const handleTextInputFocus = () => {
    setModalMarginTop('40%');
  };

  const handleInputChange = (text) => {
    setTextInputValue(text);
  };

  const handleClose = () => {
    setModalVisible(false);
    setTextInputValue('');
    setIsReplying(false);
    setReplies(false)
  };

  const handleAddComment = () => {
    const addFunction = isReplying ? AddCommentReplys : addComment;
    const commentAdded = addFunction(commentID, postID, username, userID, textInputValue);
    if (commentAdded) {
      setTextInputValue('');
      setModalVisible(false);
      setIsReplying(false);
      setReloading(true);
    } else {
      alert("Comment was not added, please try again later"); 
    }
  };

  const handleComments = () => {
    setModalVisible(true);
    fetchComments(postID);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const toggleLike = (comment) => {
    comment.liked = !comment.liked;
  };

  const handleReply = (commentID) => {
    setCommentID(commentID);
    setIsReplying(true);
    setTimeout(() => textInputRef.current?.focus(), 100);
  };


  return (
    <View style={{ width: '100%'}}>
      <TouchableOpacity 
        style={styles.button} 
        activeOpacity={0.7}
        onPress={handleComments}
      >
        <Text style={styles.buttonText}>View all comments</Text>
        <AntDesign name="right" size={14} color="white" />
      </TouchableOpacity>

      <Modal
        transparent
        visible={modalVisible}
        animationType="slide"
        onRequestClose={handleClose}
      >
     
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={{ position:'static', paddingTop:10 , height:40}}>
              <Text style={{ color: 'white' , fontWeight:'bold', textAlign:'left'}}>Comments</Text>
            </View>

          <FlatList
              data={comments}
              keyExtractor={(item) => item.$id}
              renderItem={({ item }) => (
                <View style={{ flexDirection: 'column', marginTop:15, width:'100%' }}>
                  {/*headerComments */}
                     <ActualComments1
                    comment={item.comment}
                    id={item.$id}
                    username={item.username}
                    avatar={avatar}
                    toggleLike={toggleLike}
                    handleReply={handleReply}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    showTheReplySection={showTheReplySection}
                    replies={replies}
                    replySection={false}
                    replytoComment
                    // commentRepliesArray={comments}
                  />
{/* reply comments */}
        {replies && (
            <View style={{ marginLeft:10, marginVertical:5}}>
              <ActualComments
              avatar={avatar}
              toggleLike={toggleLike}
              handleReply={handleReply}
              refreshing={refreshing}
              onRefresh={onRefresh}
              showTheReplySection={handleCommentReplies}
              replies={replies}
              replySection={true}
              replytoComment
              commentRepliesArray={commentRepliesArray}/>

            </View>

   )}
                </View>
              )}
              ListEmptyComponent={() => (
                <EmptyState
                  title="No Comments Found"
                  show={false}
                />
              )}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
       
          </View>
          
            <View style={{ marginBottom:'5%'}}>
              <View style={{ backgroundColor:'transparent' , width:'100%' , marginTop:10 , shadowOpacity:10, alignContent:'flex-start' }}> 
              <TextInput
                ref={textInputRef}
                style={{ color: 'white', paddingLeft:20 , alignSelf:'left'}}
                placeholder={isReplying ? "Reply to this comment" : "Add your comment"}
                onFocus={handleTextInputFocus}
                value={textInputValue}
                onChangeText={handleInputChange} 
                placeholderTextColor="gray"
                multiline
              />
              </View>
           
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' , marginBottom:'5%'}}>
              {textInputValue && (
                <TouchableOpacity onPress={handleAddComment} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Submit</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
            </View>
          </View>
        {/* </View> */}
      </Modal>
    </View>
  );
};

const ActualComments = ({avatar, toggleLike, handleReply, refreshing, onRefresh, showTheReplySection, replies,replySection,replytoComment, commentRepliesArray }) => { 
  return(
  <FlatList
    // data={ replytoComment ? commentRepliesArray :comments}
    data={commentRepliesArray}
    keyExtractor={(item) => item.$id}
    renderItem={({ item }) => (
      <View style={styles.commentContainer}>
        <View className="w-[30px] h-[30px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
          <Image
            source={{ uri: avatar }}
            className="w-full h-full rounded-lg"
            resizeMode="cover"
          />
        </View>

        <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', flex: 1, paddingHorizontal: 10 }}> 
        <Text style={[styles.commentText, { marginBottom: 0, paddingBottom: 0, textAlign: 'left',}]}>
          {item.username}
          </Text>
          <Text style={[styles.commentText, { marginBottom: 0, paddingBottom: 0, textAlign: 'left'}]}>
          {item.commentReply}
          </Text>
          {/* {showReply && ( */}
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 0}} onPress={()=> showTheReplySection(item.$id)}>
            <Text style={{ fontSize: 10, color: 'gray' }}>
              { replies && !replySection ? "Hide Replies" : "View Replies"  } 
            </Text>
            <EvilIcons name="eye" size={18} color="gray" style={{ marginLeft: 4, paddingBottom: 3 }} />
          </TouchableOpacity>
           {/* )} */}
        </View>
        <View style={{ paddingHorizontal: 10 }}> 
          <TouchableOpacity onPress={() => handleReply(item.$id)}>
            <AntDesign name="enter" size={20} color="gray" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => toggleLike(item)}>
          <AntDesign
            name={item.liked ? 'heart' : 'hearto'}
            size={20}
            color={item.liked ? 'red' : 'gray'}
          />
        </TouchableOpacity>
      </View>
    )}
    ListEmptyComponent={() => (
      <EmptyState
        title="No Comments Found"
        show={false}
      />
    )}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
  />
);
}

const ActualComments1 = ({ comment, username,avatar,id, toggleLike, handleReply, refreshing, onRefresh, showTheReplySection, replies,replySection,replytoComment, commentRepliesArray }) => { 
  return(
    <>
    <View style={styles.commentContainer}>
        <View className="w-[30px] h-[30px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
          <Image
            source={{ uri: avatar }}
            className="w-full h-full rounded-lg"
            resizeMode="cover"
          />
        </View>

        <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', flex: 1, paddingLeft:5}}> 
        <Text style={[styles.commentText, { textAlign: 'left', fontWeight:'700',}]}>
          {username}
          </Text>
          <Text style={[styles.commentText, {textAlign: 'left', paddingHorizontal:1, fontSize:12}]}>
          {comment}
          </Text>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 0}} onPress={()=> showTheReplySection(replySection,id)}>
            <Text style={{ fontSize: 10, color: 'gray' }}>
              { replies && !replySection ? "Hide Replies" : "View Replies"  } 
            </Text>
            <EvilIcons name="eye" size={18} color="gray" style={{ marginLeft: 4, paddingBottom: 3 }} />
          </TouchableOpacity>
        </View>
        <View style={{ paddingHorizontal: 10 }}> 
          <TouchableOpacity onPress={() => handleReply(id)}>
            <AntDesign name="enter" size={20} color="gray" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => toggleLike(item)}>
          {/* <AntDesign
            name={item.liked ? 'heart' : 'hearto'}
            size={20}
            color={item.liked ? 'red' : 'gray'}
          /> */}

<AntDesign
            name={'hearto'}
            size={20}
            color={'red'}
          />
        </TouchableOpacity>
      </View>
    </>
  )}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderColor: 'white',
    borderWidth: 0.5,
    borderRadius: 10,
    maxHeight: 35,
    height: 35,
    justifyContent: 'flex-start',
    backgroundColor: 'gray',
    shadowOpacity: 10,
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    paddingHorizontal: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    height: '70%',
    backgroundColor: 'black',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  commentContainer: {
    flexDirection: 'row',
    // marginBottom: 15,
    maxHeight: 90,
    height: 70,
  },
  commentText: {
    color: 'white', 
  },
  closeButton: {
    alignSelf: 'center',
    padding: 10,
  },
  closeButtonText: {
    color: '#818cf8',
    fontSize: 16,
  },
});

export default CommentsSection;



