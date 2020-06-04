/// <reference types="node" />
import { OAuth2Client, JWT, Compute, UserRefreshClient, GaxiosPromise, GoogleConfigurable, MethodOptions, StreamMethodOptions, GlobalOptions, GoogleAuth, BodyResponseCallback, APIRequestContext } from 'googleapis-common';
import { Readable } from 'stream';
export declare namespace classroom_v1 {
    export interface Options extends GlobalOptions {
        version: 'v1';
    }
    interface StandardParameters {
        /**
         * Auth client or API Key for the request
         */
        auth?: string | OAuth2Client | JWT | Compute | UserRefreshClient | GoogleAuth;
        /**
         * V1 error format.
         */
        '$.xgafv'?: string;
        /**
         * OAuth access token.
         */
        access_token?: string;
        /**
         * Data format for response.
         */
        alt?: string;
        /**
         * JSONP
         */
        callback?: string;
        /**
         * Selector specifying which fields to include in a partial response.
         */
        fields?: string;
        /**
         * API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token.
         */
        key?: string;
        /**
         * OAuth 2.0 token for the current user.
         */
        oauth_token?: string;
        /**
         * Returns response with indentations and line breaks.
         */
        prettyPrint?: boolean;
        /**
         * Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
         */
        quotaUser?: string;
        /**
         * Legacy upload protocol for media (e.g. "media", "multipart").
         */
        uploadType?: string;
        /**
         * Upload protocol for media (e.g. "raw", "multipart").
         */
        upload_protocol?: string;
    }
    /**
     * Google Classroom API
     *
     * Manages classes, rosters, and invitations in Google Classroom.
     *
     * @example
     * const {google} = require('googleapis');
     * const classroom = google.classroom('v1');
     *
     * @namespace classroom
     * @type {Function}
     * @version v1
     * @variation v1
     * @param {object=} options Options for Classroom
     */
    export class Classroom {
        context: APIRequestContext;
        courses: Resource$Courses;
        invitations: Resource$Invitations;
        registrations: Resource$Registrations;
        userProfiles: Resource$Userprofiles;
        constructor(options: GlobalOptions, google?: GoogleConfigurable);
    }
    /**
     * Announcement created by a teacher for students of the course
     */
    export interface Schema$Announcement {
        /**
         * Absolute link to this announcement in the Classroom web UI. This is only populated if `state` is `PUBLISHED`.  Read-only.
         */
        alternateLink?: string | null;
        /**
         * Assignee mode of the announcement. If unspecified, the default value is `ALL_STUDENTS`.
         */
        assigneeMode?: string | null;
        /**
         * Identifier of the course.  Read-only.
         */
        courseId?: string | null;
        /**
         * Timestamp when this announcement was created.  Read-only.
         */
        creationTime?: string | null;
        /**
         * Identifier for the user that created the announcement.  Read-only.
         */
        creatorUserId?: string | null;
        /**
         * Classroom-assigned identifier of this announcement, unique per course.  Read-only.
         */
        id?: string | null;
        /**
         * Identifiers of students with access to the announcement. This field is set only if `assigneeMode` is `INDIVIDUAL_STUDENTS`. If the `assigneeMode` is `INDIVIDUAL_STUDENTS`, then only students specified in this field can see the announcement.
         */
        individualStudentsOptions?: Schema$IndividualStudentsOptions;
        /**
         * Additional materials.  Announcements must have no more than 20 material items.
         */
        materials?: Schema$Material[];
        /**
         * Optional timestamp when this announcement is scheduled to be published.
         */
        scheduledTime?: string | null;
        /**
         * Status of this announcement. If unspecified, the default state is `DRAFT`.
         */
        state?: string | null;
        /**
         * Description of this announcement. The text must be a valid UTF-8 string containing no more than 30,000 characters.
         */
        text?: string | null;
        /**
         * Timestamp of the most recent change to this announcement.  Read-only.
         */
        updateTime?: string | null;
    }
    /**
     * Additional details for assignments.
     */
    export interface Schema$Assignment {
        /**
         * Drive folder where attachments from student submissions are placed. This is only populated for course teachers and administrators.
         */
        studentWorkFolder?: Schema$DriveFolder;
    }
    /**
     * Student work for an assignment.
     */
    export interface Schema$AssignmentSubmission {
        /**
         * Attachments added by the student. Drive files that correspond to materials with a share mode of STUDENT_COPY may not exist yet if the student has not accessed the assignment in Classroom.  Some attachment metadata is only populated if the requesting user has permission to access it. Identifier and alternate_link fields are always available, but others (for example, title) may not be.
         */
        attachments?: Schema$Attachment[];
    }
    /**
     * Attachment added to student assignment work.  When creating attachments, setting the `form` field is not supported.
     */
    export interface Schema$Attachment {
        /**
         * Google Drive file attachment.
         */
        driveFile?: Schema$DriveFile;
        /**
         * Google Forms attachment.
         */
        form?: Schema$Form;
        /**
         * Link attachment.
         */
        link?: Schema$Link;
        /**
         * Youtube video attachment.
         */
        youTubeVideo?: Schema$YouTubeVideo;
    }
    /**
     * A reference to a Cloud Pub/Sub topic.  To register for notifications, the owner of the topic must grant `classroom-notifications@system.gserviceaccount.com` the  `projects.topics.publish` permission.
     */
    export interface Schema$CloudPubsubTopic {
        /**
         * The `name` field of a Cloud Pub/Sub [Topic](https://cloud.google.com/pubsub/docs/reference/rest/v1/projects.topics#Topic).
         */
        topicName?: string | null;
    }
    /**
     * A Course in Classroom.
     */
    export interface Schema$Course {
        /**
         * Absolute link to this course in the Classroom web UI.  Read-only.
         */
        alternateLink?: string | null;
        /**
         * The Calendar ID for a calendar that all course members can see, to which Classroom adds events for course work and announcements in the course.  Read-only.
         */
        calendarId?: string | null;
        /**
         * The email address of a Google group containing all members of the course. This group does not accept email and can only be used for permissions.  Read-only.
         */
        courseGroupEmail?: string | null;
        /**
         * Sets of materials that appear on the &quot;about&quot; page of this course.  Read-only.
         */
        courseMaterialSets?: Schema$CourseMaterialSet[];
        /**
         * State of the course. If unspecified, the default state is `PROVISIONED`.
         */
        courseState?: string | null;
        /**
         * Creation time of the course. Specifying this field in a course update mask results in an error.  Read-only.
         */
        creationTime?: string | null;
        /**
         * Optional description. For example, &quot;We&#39;ll be learning about the structure of living creatures from a combination of textbooks, guest lectures, and lab work. Expect to be excited!&quot; If set, this field must be a valid UTF-8 string and no longer than 30,000 characters.
         */
        description?: string | null;
        /**
         * Optional heading for the description. For example, &quot;Welcome to 10th Grade Biology.&quot; If set, this field must be a valid UTF-8 string and no longer than 3600 characters.
         */
        descriptionHeading?: string | null;
        /**
         * Enrollment code to use when joining this course. Specifying this field in a course update mask results in an error.  Read-only.
         */
        enrollmentCode?: string | null;
        /**
         * Whether or not guardian notifications are enabled for this course.  Read-only.
         */
        guardiansEnabled?: boolean | null;
        /**
         * Identifier for this course assigned by Classroom.  When creating a course, you may optionally set this identifier to an alias string in the request to create a corresponding alias. The `id` is still assigned by Classroom and cannot be updated after the course is created.  Specifying this field in a course update mask results in an error.
         */
        id?: string | null;
        /**
         * Name of the course. For example, &quot;10th Grade Biology&quot;. The name is required. It must be between 1 and 750 characters and a valid UTF-8 string.
         */
        name?: string | null;
        /**
         * The identifier of the owner of a course.  When specified as a parameter of a create course request, this field is required. The identifier can be one of the following:  * the numeric identifier for the user * the email address of the user * the string literal `&quot;me&quot;`, indicating the requesting user  This must be set in a create request. Admins can also specify this field in a patch course request to transfer ownership. In other contexts, it is read-only.
         */
        ownerId?: string | null;
        /**
         * Optional room location. For example, &quot;301&quot;. If set, this field must be a valid UTF-8 string and no longer than 650 characters.
         */
        room?: string | null;
        /**
         * Section of the course. For example, &quot;Period 2&quot;. If set, this field must be a valid UTF-8 string and no longer than 2800 characters.
         */
        section?: string | null;
        /**
         * Information about a Drive Folder that is shared with all teachers of the course.  This field will only be set for teachers of the course and domain administrators.  Read-only.
         */
        teacherFolder?: Schema$DriveFolder;
        /**
         * The email address of a Google group containing all teachers of the course. This group does not accept email and can only be used for permissions.  Read-only.
         */
        teacherGroupEmail?: string | null;
        /**
         * Time of the most recent update to this course. Specifying this field in a course update mask results in an error.  Read-only.
         */
        updateTime?: string | null;
    }
    /**
     * Alternative identifier for a course.  An alias uniquely identifies a course. It must be unique within one of the following scopes:  * domain: A domain-scoped alias is visible to all users within the alias creator&#39;s domain and can be created only by a domain admin. A domain-scoped alias is often used when a course has an identifier external to Classroom.  * project: A project-scoped alias is visible to any request from an application using the Developer Console project ID that created the alias and can be created by any project. A project-scoped alias is often used when an application has alternative identifiers. A random value can also be used to avoid duplicate courses in the event of transmission failures, as retrying a request will return `ALREADY_EXISTS` if a previous one has succeeded.
     */
    export interface Schema$CourseAlias {
        /**
         * Alias string. The format of the string indicates the desired alias scoping.  * `d:&lt;name&gt;` indicates a domain-scoped alias.   Example: `d:math_101` * `p:&lt;name&gt;` indicates a project-scoped alias.   Example: `p:abc123`  This field has a maximum length of 256 characters.
         */
        alias?: string | null;
    }
    /**
     * A material attached to a course as part of a material set.
     */
    export interface Schema$CourseMaterial {
        /**
         * Google Drive file attachment.
         */
        driveFile?: Schema$DriveFile;
        /**
         * Google Forms attachment.
         */
        form?: Schema$Form;
        /**
         * Link atatchment.
         */
        link?: Schema$Link;
        /**
         * Youtube video attachment.
         */
        youTubeVideo?: Schema$YouTubeVideo;
    }
    /**
     * A set of materials that appears on the &quot;About&quot; page of the course. These materials might include a syllabus, schedule, or other background information relating to the course as a whole.
     */
    export interface Schema$CourseMaterialSet {
        /**
         * Materials attached to this set.
         */
        materials?: Schema$CourseMaterial[];
        /**
         * Title for this set.
         */
        title?: string | null;
    }
    /**
     * Information about a `Feed` with a `feed_type` of `COURSE_ROSTER_CHANGES`.
     */
    export interface Schema$CourseRosterChangesInfo {
        /**
         * The `course_id` of the course to subscribe to roster changes for.
         */
        courseId?: string | null;
    }
    /**
     * Course work created by a teacher for students of the course.
     */
    export interface Schema$CourseWork {
        /**
         * Absolute link to this course work in the Classroom web UI. This is only populated if `state` is `PUBLISHED`.  Read-only.
         */
        alternateLink?: string | null;
        /**
         * Assignee mode of the coursework. If unspecified, the default value is `ALL_STUDENTS`.
         */
        assigneeMode?: string | null;
        /**
         * Assignment details. This is populated only when `work_type` is `ASSIGNMENT`.  Read-only.
         */
        assignment?: Schema$Assignment;
        /**
         * Whether this course work item is associated with the Developer Console project making the request.  See CreateCourseWork for more details.  Read-only.
         */
        associatedWithDeveloper?: boolean | null;
        /**
         * Identifier of the course.  Read-only.
         */
        courseId?: string | null;
        /**
         * Timestamp when this course work was created.  Read-only.
         */
        creationTime?: string | null;
        /**
         * Identifier for the user that created the coursework.  Read-only.
         */
        creatorUserId?: string | null;
        /**
         * Optional description of this course work. If set, the description must be a valid UTF-8 string containing no more than 30,000 characters.
         */
        description?: string | null;
        /**
         * Optional date, in UTC, that submissions for this course work are due. This must be specified if `due_time` is specified.
         */
        dueDate?: Schema$Date;
        /**
         * Optional time of day, in UTC, that submissions for this course work are due. This must be specified if `due_date` is specified.
         */
        dueTime?: Schema$TimeOfDay;
        /**
         * Classroom-assigned identifier of this course work, unique per course.  Read-only.
         */
        id?: string | null;
        /**
         * Identifiers of students with access to the coursework. This field is set only if `assigneeMode` is `INDIVIDUAL_STUDENTS`. If the `assigneeMode` is `INDIVIDUAL_STUDENTS`, then only students specified in this field are assigned the coursework.
         */
        individualStudentsOptions?: Schema$IndividualStudentsOptions;
        /**
         * Additional materials.  CourseWork must have no more than 20 material items.
         */
        materials?: Schema$Material[];
        /**
         * Maximum grade for this course work. If zero or unspecified, this assignment is considered ungraded. This must be a non-negative integer value.
         */
        maxPoints?: number | null;
        /**
         * Multiple choice question details. For read operations, this field is populated only when `work_type` is `MULTIPLE_CHOICE_QUESTION`. For write operations, this field must be specified when creating course work with a `work_type` of `MULTIPLE_CHOICE_QUESTION`, and it must not be set otherwise.
         */
        multipleChoiceQuestion?: Schema$MultipleChoiceQuestion;
        /**
         * Optional timestamp when this course work is scheduled to be published.
         */
        scheduledTime?: string | null;
        /**
         * Status of this course work. If unspecified, the default state is `DRAFT`.
         */
        state?: string | null;
        /**
         * Setting to determine when students are allowed to modify submissions. If unspecified, the default value is `MODIFIABLE_UNTIL_TURNED_IN`.
         */
        submissionModificationMode?: string | null;
        /**
         * Title of this course work. The title must be a valid UTF-8 string containing between 1 and 3000 characters.
         */
        title?: string | null;
        /**
         * Identifier for the topic that this coursework is associated with. Must match an existing topic in the course.
         */
        topicId?: string | null;
        /**
         * Timestamp of the most recent change to this course work.  Read-only.
         */
        updateTime?: string | null;
        /**
         * Type of this course work.  The type is set when the course work is created and cannot be changed.
         */
        workType?: string | null;
    }
    /**
     * Information about a `Feed` with a `feed_type` of `COURSE_WORK_CHANGES`.
     */
    export interface Schema$CourseWorkChangesInfo {
        /**
         * The `course_id` of the course to subscribe to work changes for.
         */
        courseId?: string | null;
    }
    /**
     * Represents a whole or partial calendar date, e.g. a birthday. The time of day and time zone are either specified elsewhere or are not significant. The date is relative to the Proleptic Gregorian Calendar. This can represent:  * A full date, with non-zero year, month and day values * A month and day value, with a zero year, e.g. an anniversary * A year on its own, with zero month and day values * A year and month value, with a zero day, e.g. a credit card expiration date  Related types are google.type.TimeOfDay and `google.protobuf.Timestamp`.
     */
    export interface Schema$Date {
        /**
         * Day of month. Must be from 1 to 31 and valid for the year and month, or 0 if specifying a year by itself or a year and month where the day is not significant.
         */
        day?: number | null;
        /**
         * Month of year. Must be from 1 to 12, or 0 if specifying a year without a month and day.
         */
        month?: number | null;
        /**
         * Year of date. Must be from 1 to 9999, or 0 if specifying a date without a year.
         */
        year?: number | null;
    }
    /**
     * Representation of a Google Drive file.
     */
    export interface Schema$DriveFile {
        /**
         * URL that can be used to access the Drive item.  Read-only.
         */
        alternateLink?: string | null;
        /**
         * Drive API resource ID.
         */
        id?: string | null;
        /**
         * URL of a thumbnail image of the Drive item.  Read-only.
         */
        thumbnailUrl?: string | null;
        /**
         * Title of the Drive item.  Read-only.
         */
        title?: string | null;
    }
    /**
     * Representation of a Google Drive folder.
     */
    export interface Schema$DriveFolder {
        /**
         * URL that can be used to access the Drive folder.  Read-only.
         */
        alternateLink?: string | null;
        /**
         * Drive API resource ID.
         */
        id?: string | null;
        /**
         * Title of the Drive folder.  Read-only.
         */
        title?: string | null;
    }
    /**
     * A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance:      service Foo {       rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty);     }  The JSON representation for `Empty` is empty JSON object `{}`.
     */
    export interface Schema$Empty {
    }
    /**
     * A class of notifications that an application can register to receive. For example: &quot;all roster changes for a domain&quot;.
     */
    export interface Schema$Feed {
        /**
         * Information about a `Feed` with a `feed_type` of `COURSE_ROSTER_CHANGES`. This field must be specified if `feed_type` is `COURSE_ROSTER_CHANGES`.
         */
        courseRosterChangesInfo?: Schema$CourseRosterChangesInfo;
        /**
         * Information about a `Feed` with a `feed_type` of `COURSE_WORK_CHANGES`. This field must be specified if `feed_type` is `COURSE_WORK_CHANGES`.
         */
        courseWorkChangesInfo?: Schema$CourseWorkChangesInfo;
        /**
         * The type of feed.
         */
        feedType?: string | null;
    }
    /**
     * Google Forms item.
     */
    export interface Schema$Form {
        /**
         * URL of the form.
         */
        formUrl?: string | null;
        /**
         * URL of the form responses document. Only set if respsonses have been recorded and only when the requesting user is an editor of the form.  Read-only.
         */
        responseUrl?: string | null;
        /**
         * URL of a thumbnail image of the Form.  Read-only.
         */
        thumbnailUrl?: string | null;
        /**
         * Title of the Form.  Read-only.
         */
        title?: string | null;
    }
    /**
     * Global user permission description.
     */
    export interface Schema$GlobalPermission {
        /**
         * Permission value.
         */
        permission?: string | null;
    }
    /**
     * The history of each grade on this submission.
     */
    export interface Schema$GradeHistory {
        /**
         * The teacher who made the grade change.
         */
        actorUserId?: string | null;
        /**
         * The type of grade change at this time in the submission grade history.
         */
        gradeChangeType?: string | null;
        /**
         * When the grade of the submission was changed.
         */
        gradeTimestamp?: string | null;
        /**
         * The denominator of the grade at this time in the submission grade history.
         */
        maxPoints?: number | null;
        /**
         * The numerator of the grade at this time in the submission grade history.
         */
        pointsEarned?: number | null;
    }
    /**
     * Association between a student and a guardian of that student. The guardian may receive information about the student&#39;s course work.
     */
    export interface Schema$Guardian {
        /**
         * Identifier for the guardian.
         */
        guardianId?: string | null;
        /**
         * User profile for the guardian.
         */
        guardianProfile?: Schema$UserProfile;
        /**
         * The email address to which the initial guardian invitation was sent. This field is only visible to domain administrators.
         */
        invitedEmailAddress?: string | null;
        /**
         * Identifier for the student to whom the guardian relationship applies.
         */
        studentId?: string | null;
    }
    /**
     * An invitation to become the guardian of a specified user, sent to a specified email address.
     */
    export interface Schema$GuardianInvitation {
        /**
         * The time that this invitation was created.  Read-only.
         */
        creationTime?: string | null;
        /**
         * Unique identifier for this invitation.  Read-only.
         */
        invitationId?: string | null;
        /**
         * Email address that the invitation was sent to. This field is only visible to domain administrators.
         */
        invitedEmailAddress?: string | null;
        /**
         * The state that this invitation is in.
         */
        state?: string | null;
        /**
         * ID of the student (in standard format)
         */
        studentId?: string | null;
    }
    /**
     * Assignee details about a coursework/announcement. This field is set if and only if `assigneeMode` is `INDIVIDUAL_STUDENTS`.
     */
    export interface Schema$IndividualStudentsOptions {
        /**
         * Identifiers for the students that have access to the coursework/announcement.
         */
        studentIds?: string[] | null;
    }
    /**
     * An invitation to join a course.
     */
    export interface Schema$Invitation {
        /**
         * Identifier of the course to invite the user to.
         */
        courseId?: string | null;
        /**
         * Identifier assigned by Classroom.  Read-only.
         */
        id?: string | null;
        /**
         * Role to invite the user to have. Must not be `COURSE_ROLE_UNSPECIFIED`.
         */
        role?: string | null;
        /**
         * Identifier of the invited user.  When specified as a parameter of a request, this identifier can be set to one of the following:  * the numeric identifier for the user * the email address of the user * the string literal `&quot;me&quot;`, indicating the requesting user
         */
        userId?: string | null;
    }
    /**
     * URL item.
     */
    export interface Schema$Link {
        /**
         * URL of a thumbnail image of the target URL.  Read-only.
         */
        thumbnailUrl?: string | null;
        /**
         * Title of the target of the URL.  Read-only.
         */
        title?: string | null;
        /**
         * URL to link to. This must be a valid UTF-8 string containing between 1 and 2024 characters.
         */
        url?: string | null;
    }
    /**
     * Response when listing course work.
     */
    export interface Schema$ListAnnouncementsResponse {
        /**
         * Announcement items that match the request.
         */
        announcements?: Schema$Announcement[];
        /**
         * Token identifying the next page of results to return. If empty, no further results are available.
         */
        nextPageToken?: string | null;
    }
    /**
     * Response when listing course aliases.
     */
    export interface Schema$ListCourseAliasesResponse {
        /**
         * The course aliases.
         */
        aliases?: Schema$CourseAlias[];
        /**
         * Token identifying the next page of results to return. If empty, no further results are available.
         */
        nextPageToken?: string | null;
    }
    /**
     * Response when listing courses.
     */
    export interface Schema$ListCoursesResponse {
        /**
         * Courses that match the list request.
         */
        courses?: Schema$Course[];
        /**
         * Token identifying the next page of results to return. If empty, no further results are available.
         */
        nextPageToken?: string | null;
    }
    /**
     * Response when listing course work.
     */
    export interface Schema$ListCourseWorkResponse {
        /**
         * Course work items that match the request.
         */
        courseWork?: Schema$CourseWork[];
        /**
         * Token identifying the next page of results to return. If empty, no further results are available.
         */
        nextPageToken?: string | null;
    }
    /**
     * Response when listing guardian invitations.
     */
    export interface Schema$ListGuardianInvitationsResponse {
        /**
         * Guardian invitations that matched the list request.
         */
        guardianInvitations?: Schema$GuardianInvitation[];
        /**
         * Token identifying the next page of results to return. If empty, no further results are available.
         */
        nextPageToken?: string | null;
    }
    /**
     * Response when listing guardians.
     */
    export interface Schema$ListGuardiansResponse {
        /**
         * Guardians on this page of results that met the criteria specified in the request.
         */
        guardians?: Schema$Guardian[];
        /**
         * Token identifying the next page of results to return. If empty, no further results are available.
         */
        nextPageToken?: string | null;
    }
    /**
     * Response when listing invitations.
     */
    export interface Schema$ListInvitationsResponse {
        /**
         * Invitations that match the list request.
         */
        invitations?: Schema$Invitation[];
        /**
         * Token identifying the next page of results to return. If empty, no further results are available.
         */
        nextPageToken?: string | null;
    }
    /**
     * Response when listing students.
     */
    export interface Schema$ListStudentsResponse {
        /**
         * Token identifying the next page of results to return. If empty, no further results are available.
         */
        nextPageToken?: string | null;
        /**
         * Students who match the list request.
         */
        students?: Schema$Student[];
    }
    /**
     * Response when listing student submissions.
     */
    export interface Schema$ListStudentSubmissionsResponse {
        /**
         * Token identifying the next page of results to return. If empty, no further results are available.
         */
        nextPageToken?: string | null;
        /**
         * Student work that matches the request.
         */
        studentSubmissions?: Schema$StudentSubmission[];
    }
    /**
     * Response when listing teachers.
     */
    export interface Schema$ListTeachersResponse {
        /**
         * Token identifying the next page of results to return. If empty, no further results are available.
         */
        nextPageToken?: string | null;
        /**
         * Teachers who match the list request.
         */
        teachers?: Schema$Teacher[];
    }
    /**
     * Response when listing topics.
     */
    export interface Schema$ListTopicResponse {
        /**
         * Token identifying the next page of results to return. If empty, no further results are available.
         */
        nextPageToken?: string | null;
        /**
         * Topic items that match the request.
         */
        topic?: Schema$Topic[];
    }
    /**
     * Material attached to course work.  When creating attachments, setting the `form` field is not supported.
     */
    export interface Schema$Material {
        /**
         * Google Drive file material.
         */
        driveFile?: Schema$SharedDriveFile;
        /**
         * Google Forms material.
         */
        form?: Schema$Form;
        /**
         * Link material. On creation, this is upgraded to a more appropriate type if possible, and this is reflected in the response.
         */
        link?: Schema$Link;
        /**
         * YouTube video material.
         */
        youtubeVideo?: Schema$YouTubeVideo;
    }
    /**
     * Request to modify assignee mode and options of an announcement.
     */
    export interface Schema$ModifyAnnouncementAssigneesRequest {
        /**
         * Mode of the announcement describing whether it is accessible by all students or specified individual students.
         */
        assigneeMode?: string | null;
        /**
         * Set which students can view or cannot view the announcement. Must be specified only when `assigneeMode` is `INDIVIDUAL_STUDENTS`.
         */
        modifyIndividualStudentsOptions?: Schema$ModifyIndividualStudentsOptions;
    }
    /**
     * Request to modify the attachments of a student submission.
     */
    export interface Schema$ModifyAttachmentsRequest {
        /**
         * Attachments to add. A student submission may not have more than 20 attachments.  Form attachments are not supported.
         */
        addAttachments?: Schema$Attachment[];
    }
    /**
     * Request to modify assignee mode and options of a coursework.
     */
    export interface Schema$ModifyCourseWorkAssigneesRequest {
        /**
         * Mode of the coursework describing whether it will be assigned to all students or specified individual students.
         */
        assigneeMode?: string | null;
        /**
         * Set which students are assigned or not assigned to the coursework. Must be specified only when `assigneeMode` is `INDIVIDUAL_STUDENTS`.
         */
        modifyIndividualStudentsOptions?: Schema$ModifyIndividualStudentsOptions;
    }
    /**
     * Contains fields to add or remove students from a course work or announcement where the `assigneeMode` is set to `INDIVIDUAL_STUDENTS`.
     */
    export interface Schema$ModifyIndividualStudentsOptions {
        /**
         * IDs of students to be added as having access to this coursework/announcement.
         */
        addStudentIds?: string[] | null;
        /**
         * IDs of students to be removed from having access to this coursework/announcement.
         */
        removeStudentIds?: string[] | null;
    }
    /**
     * Additional details for multiple-choice questions.
     */
    export interface Schema$MultipleChoiceQuestion {
        /**
         * Possible choices.
         */
        choices?: string[] | null;
    }
    /**
     * Student work for a multiple-choice question.
     */
    export interface Schema$MultipleChoiceSubmission {
        /**
         * Student&#39;s select choice.
         */
        answer?: string | null;
    }
    /**
     * Details of the user&#39;s name.
     */
    export interface Schema$Name {
        /**
         * The user&#39;s last name.  Read-only.
         */
        familyName?: string | null;
        /**
         * The user&#39;s full name formed by concatenating the first and last name values.  Read-only.
         */
        fullName?: string | null;
        /**
         * The user&#39;s first name.  Read-only.
         */
        givenName?: string | null;
    }
    /**
     * Request to reclaim a student submission.
     */
    export interface Schema$ReclaimStudentSubmissionRequest {
    }
    /**
     * An instruction to Classroom to send notifications from the `feed` to the provided destination.
     */
    export interface Schema$Registration {
        /**
         * The Cloud Pub/Sub topic that notifications are to be sent to.
         */
        cloudPubsubTopic?: Schema$CloudPubsubTopic;
        /**
         * The time until which the `Registration` is effective.  This is a read-only field assigned by the server.
         */
        expiryTime?: string | null;
        /**
         * Specification for the class of notifications that Classroom should deliver to the destination.
         */
        feed?: Schema$Feed;
        /**
         * A server-generated unique identifier for this `Registration`.  Read-only.
         */
        registrationId?: string | null;
    }
    /**
     * Request to return a student submission.
     */
    export interface Schema$ReturnStudentSubmissionRequest {
    }
    /**
     * Drive file that is used as material for course work.
     */
    export interface Schema$SharedDriveFile {
        /**
         * Drive file details.
         */
        driveFile?: Schema$DriveFile;
        /**
         * Mechanism by which students access the Drive item.
         */
        shareMode?: string | null;
    }
    /**
     * Student work for a short answer question.
     */
    export interface Schema$ShortAnswerSubmission {
        /**
         * Student response to a short-answer question.
         */
        answer?: string | null;
    }
    /**
     * The history of each state this submission has been in.
     */
    export interface Schema$StateHistory {
        /**
         * The teacher or student who made the change.
         */
        actorUserId?: string | null;
        /**
         * The workflow pipeline stage.
         */
        state?: string | null;
        /**
         * When the submission entered this state.
         */
        stateTimestamp?: string | null;
    }
    /**
     * Student in a course.
     */
    export interface Schema$Student {
        /**
         * Identifier of the course.  Read-only.
         */
        courseId?: string | null;
        /**
         * Global user information for the student.  Read-only.
         */
        profile?: Schema$UserProfile;
        /**
         * Information about a Drive Folder for this student&#39;s work in this course. Only visible to the student and domain administrators.  Read-only.
         */
        studentWorkFolder?: Schema$DriveFolder;
        /**
         * Identifier of the user.  When specified as a parameter of a request, this identifier can be one of the following:  * the numeric identifier for the user * the email address of the user * the string literal `&quot;me&quot;`, indicating the requesting user
         */
        userId?: string | null;
    }
    /**
     * Student submission for course work.  StudentSubmission items are generated when a CourseWork item is created.  StudentSubmissions that have never been accessed (i.e. with `state` = NEW) may not have a creation time or update time.
     */
    export interface Schema$StudentSubmission {
        /**
         * Absolute link to the submission in the Classroom web UI.  Read-only.
         */
        alternateLink?: string | null;
        /**
         * Optional grade. If unset, no grade was set. This value must be non-negative. Decimal (that is, non-integer) values are allowed, but are rounded to two decimal places.  This may be modified only by course teachers.
         */
        assignedGrade?: number | null;
        /**
         * Submission content when course_work_type is ASSIGNMENT.  Students can modify this content using ModifyAttachments.
         */
        assignmentSubmission?: Schema$AssignmentSubmission;
        /**
         * Whether this student submission is associated with the Developer Console project making the request.  See CreateCourseWork for more details.  Read-only.
         */
        associatedWithDeveloper?: boolean | null;
        /**
         * Identifier of the course.  Read-only.
         */
        courseId?: string | null;
        /**
         * Identifier for the course work this corresponds to.  Read-only.
         */
        courseWorkId?: string | null;
        /**
         * Type of course work this submission is for.  Read-only.
         */
        courseWorkType?: string | null;
        /**
         * Creation time of this submission. This may be unset if the student has not accessed this item.  Read-only.
         */
        creationTime?: string | null;
        /**
         * Optional pending grade. If unset, no grade was set. This value must be non-negative. Decimal (that is, non-integer) values are allowed, but are rounded to two decimal places.  This is only visible to and modifiable by course teachers.
         */
        draftGrade?: number | null;
        /**
         * Classroom-assigned Identifier for the student submission. This is unique among submissions for the relevant course work.  Read-only.
         */
        id?: string | null;
        /**
         * Whether this submission is late.  Read-only.
         */
        late?: boolean | null;
        /**
         * Submission content when course_work_type is MULTIPLE_CHOICE_QUESTION.
         */
        multipleChoiceSubmission?: Schema$MultipleChoiceSubmission;
        /**
         * Submission content when course_work_type is SHORT_ANSWER_QUESTION.
         */
        shortAnswerSubmission?: Schema$ShortAnswerSubmission;
        /**
         * State of this submission.  Read-only.
         */
        state?: string | null;
        /**
         * The history of the submission (includes state and grade histories).  Read-only.
         */
        submissionHistory?: Schema$SubmissionHistory[];
        /**
         * Last update time of this submission. This may be unset if the student has not accessed this item.  Read-only.
         */
        updateTime?: string | null;
        /**
         * Identifier for the student that owns this submission.  Read-only.
         */
        userId?: string | null;
    }
    /**
     * The history of the submission. This currently includes state and grade histories.
     */
    export interface Schema$SubmissionHistory {
        /**
         * The grade history information of the submission, if present.
         */
        gradeHistory?: Schema$GradeHistory;
        /**
         * The state history information of the submission, if present.
         */
        stateHistory?: Schema$StateHistory;
    }
    /**
     * Teacher of a course.
     */
    export interface Schema$Teacher {
        /**
         * Identifier of the course.  Read-only.
         */
        courseId?: string | null;
        /**
         * Global user information for the teacher.  Read-only.
         */
        profile?: Schema$UserProfile;
        /**
         * Identifier of the user.  When specified as a parameter of a request, this identifier can be one of the following:  * the numeric identifier for the user * the email address of the user * the string literal `&quot;me&quot;`, indicating the requesting user
         */
        userId?: string | null;
    }
    /**
     * Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.
     */
    export interface Schema$TimeOfDay {
        /**
         * Hours of day in 24 hour format. Should be from 0 to 23. An API may choose to allow the value &quot;24:00:00&quot; for scenarios like business closing time.
         */
        hours?: number | null;
        /**
         * Minutes of hour of day. Must be from 0 to 59.
         */
        minutes?: number | null;
        /**
         * Fractions of seconds in nanoseconds. Must be from 0 to 999,999,999.
         */
        nanos?: number | null;
        /**
         * Seconds of minutes of the time. Must normally be from 0 to 59. An API may allow the value 60 if it allows leap-seconds.
         */
        seconds?: number | null;
    }
    /**
     * Topic created by a teacher for the course
     */
    export interface Schema$Topic {
        /**
         * Identifier of the course.  Read-only.
         */
        courseId?: string | null;
        /**
         * The name of the topic, generated by the user. Leading and trailing whitespaces, if any, are trimmed. Also, multiple consecutive whitespaces are collapsed into one inside the name. The result must be a non-empty string. Topic names are case sensitive, and must be no longer than 100 characters.
         */
        name?: string | null;
        /**
         * Unique identifier for the topic.  Read-only.
         */
        topicId?: string | null;
        /**
         * The time the topic was last updated by the system.  Read-only.
         */
        updateTime?: string | null;
    }
    /**
     * Request to turn in a student submission.
     */
    export interface Schema$TurnInStudentSubmissionRequest {
    }
    /**
     * Global information for a user.
     */
    export interface Schema$UserProfile {
        /**
         * Email address of the user.  Read-only.
         */
        emailAddress?: string | null;
        /**
         * Identifier of the user.  Read-only.
         */
        id?: string | null;
        /**
         * Name of the user.  Read-only.
         */
        name?: Schema$Name;
        /**
         * Global permissions of the user.  Read-only.
         */
        permissions?: Schema$GlobalPermission[];
        /**
         * URL of user&#39;s profile photo.  Read-only.
         */
        photoUrl?: string | null;
        /**
         * Represents whether a G Suite for Education user&#39;s domain administrator has explicitly verified them as being a teacher. If the user is not a member of a G Suite for Education domain, than this field is always false.  Read-only
         */
        verifiedTeacher?: boolean | null;
    }
    /**
     * YouTube video item.
     */
    export interface Schema$YouTubeVideo {
        /**
         * URL that can be used to view the YouTube video.  Read-only.
         */
        alternateLink?: string | null;
        /**
         * YouTube API resource ID.
         */
        id?: string | null;
        /**
         * URL of a thumbnail image of the YouTube video.  Read-only.
         */
        thumbnailUrl?: string | null;
        /**
         * Title of the YouTube video.  Read-only.
         */
        title?: string | null;
    }
    export class Resource$Courses {
        context: APIRequestContext;
        aliases: Resource$Courses$Aliases;
        announcements: Resource$Courses$Announcements;
        courseWork: Resource$Courses$Coursework;
        students: Resource$Courses$Students;
        teachers: Resource$Courses$Teachers;
        topics: Resource$Courses$Topics;
        constructor(context: APIRequestContext);
        /**
         * classroom.courses.create
         * @desc Creates a course.  The user specified in `ownerId` is the owner of the created course and added as a teacher.  This method returns the following error codes:  * `PERMISSION_DENIED` if the requesting user is not permitted to create courses or for access errors. * `NOT_FOUND` if the primary teacher is not a valid user. * `FAILED_PRECONDITION` if the course owner's account is disabled or for the following request errors:     * UserGroupsMembershipLimitReached * `ALREADY_EXISTS` if an alias was specified in the `id` and already exists.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/classroom.courses'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.courses.create({
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "alternateLink": "my_alternateLink",
         *       //   "calendarId": "my_calendarId",
         *       //   "courseGroupEmail": "my_courseGroupEmail",
         *       //   "courseMaterialSets": [],
         *       //   "courseState": "my_courseState",
         *       //   "creationTime": "my_creationTime",
         *       //   "description": "my_description",
         *       //   "descriptionHeading": "my_descriptionHeading",
         *       //   "enrollmentCode": "my_enrollmentCode",
         *       //   "guardiansEnabled": false,
         *       //   "id": "my_id",
         *       //   "name": "my_name",
         *       //   "ownerId": "my_ownerId",
         *       //   "room": "my_room",
         *       //   "section": "my_section",
         *       //   "teacherFolder": {},
         *       //   "teacherGroupEmail": "my_teacherGroupEmail",
         *       //   "updateTime": "my_updateTime"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "alternateLink": "my_alternateLink",
         *   //   "calendarId": "my_calendarId",
         *   //   "courseGroupEmail": "my_courseGroupEmail",
         *   //   "courseMaterialSets": [],
         *   //   "courseState": "my_courseState",
         *   //   "creationTime": "my_creationTime",
         *   //   "description": "my_description",
         *   //   "descriptionHeading": "my_descriptionHeading",
         *   //   "enrollmentCode": "my_enrollmentCode",
         *   //   "guardiansEnabled": false,
         *   //   "id": "my_id",
         *   //   "name": "my_name",
         *   //   "ownerId": "my_ownerId",
         *   //   "room": "my_room",
         *   //   "section": "my_section",
         *   //   "teacherFolder": {},
         *   //   "teacherGroupEmail": "my_teacherGroupEmail",
         *   //   "updateTime": "my_updateTime"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.courses.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {().Course} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Courses$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Courses$Create, options?: MethodOptions): GaxiosPromise<Schema$Course>;
        create(params: Params$Resource$Courses$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Courses$Create, options: MethodOptions | BodyResponseCallback<Schema$Course>, callback: BodyResponseCallback<Schema$Course>): void;
        create(params: Params$Resource$Courses$Create, callback: BodyResponseCallback<Schema$Course>): void;
        create(callback: BodyResponseCallback<Schema$Course>): void;
        /**
         * classroom.courses.delete
         * @desc Deletes a course.  This method returns the following error codes:  * `PERMISSION_DENIED` if the requesting user is not permitted to delete the requested course or for access errors. * `NOT_FOUND` if no course exists with the requested ID.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/classroom.courses'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.courses.delete({
         *     // Identifier of the course to delete.
         *     // This identifier can be either the Classroom-assigned identifier or an
         *     // alias.
         *     id: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {}
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.courses.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.id Identifier of the course to delete. This identifier can be either the Classroom-assigned identifier or an alias.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Courses$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Courses$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Courses$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Courses$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Courses$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * classroom.courses.get
         * @desc Returns a course.  This method returns the following error codes:  * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or for access errors. * `NOT_FOUND` if no course exists with the requested ID.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/classroom.courses',
         *       'https://www.googleapis.com/auth/classroom.courses.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.courses.get({
         *     // Identifier of the course to return.
         *     // This identifier can be either the Classroom-assigned identifier or an
         *     // alias.
         *     id: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "alternateLink": "my_alternateLink",
         *   //   "calendarId": "my_calendarId",
         *   //   "courseGroupEmail": "my_courseGroupEmail",
         *   //   "courseMaterialSets": [],
         *   //   "courseState": "my_courseState",
         *   //   "creationTime": "my_creationTime",
         *   //   "description": "my_description",
         *   //   "descriptionHeading": "my_descriptionHeading",
         *   //   "enrollmentCode": "my_enrollmentCode",
         *   //   "guardiansEnabled": false,
         *   //   "id": "my_id",
         *   //   "name": "my_name",
         *   //   "ownerId": "my_ownerId",
         *   //   "room": "my_room",
         *   //   "section": "my_section",
         *   //   "teacherFolder": {},
         *   //   "teacherGroupEmail": "my_teacherGroupEmail",
         *   //   "updateTime": "my_updateTime"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.courses.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.id Identifier of the course to return. This identifier can be either the Classroom-assigned identifier or an alias.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Courses$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Courses$Get, options?: MethodOptions): GaxiosPromise<Schema$Course>;
        get(params: Params$Resource$Courses$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Courses$Get, options: MethodOptions | BodyResponseCallback<Schema$Course>, callback: BodyResponseCallback<Schema$Course>): void;
        get(params: Params$Resource$Courses$Get, callback: BodyResponseCallback<Schema$Course>): void;
        get(callback: BodyResponseCallback<Schema$Course>): void;
        /**
         * classroom.courses.list
         * @desc Returns a list of courses that the requesting user is permitted to view, restricted to those that match the request. Returned courses are ordered by creation time, with the most recently created coming first.  This method returns the following error codes:  * `PERMISSION_DENIED` for access errors. * `INVALID_ARGUMENT` if the query argument is malformed. * `NOT_FOUND` if any users specified in the query arguments do not exist.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/classroom.courses',
         *       'https://www.googleapis.com/auth/classroom.courses.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.courses.list({
         *     // Restricts returned courses to those in one of the specified states
         *     // The default value is ACTIVE, ARCHIVED, PROVISIONED, DECLINED.
         *     courseStates: 'placeholder-value',
         *     // Maximum number of items to return. Zero or unspecified indicates that the
         *     // server may assign a maximum.
         *     //
         *     // The server may return fewer than the specified number of results.
         *     pageSize: 'placeholder-value',
         *     // nextPageToken
         *     // value returned from a previous
         *     // list call,
         *     // indicating that the subsequent page of results should be returned.
         *     //
         *     // The list request must be
         *     // otherwise identical to the one that resulted in this token.
         *     pageToken: 'placeholder-value',
         *     // Restricts returned courses to those having a student with the specified
         *     // identifier. The identifier can be one of the following:
         *     //
         *     // * the numeric identifier for the user
         *     // * the email address of the user
         *     // * the string literal `"me"`, indicating the requesting user
         *     studentId: 'placeholder-value',
         *     // Restricts returned courses to those having a teacher with the specified
         *     // identifier. The identifier can be one of the following:
         *     //
         *     // * the numeric identifier for the user
         *     // * the email address of the user
         *     // * the string literal `"me"`, indicating the requesting user
         *     teacherId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "courses": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.courses.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.courseStates Restricts returned courses to those in one of the specified states The default value is ACTIVE, ARCHIVED, PROVISIONED, DECLINED.
         * @param {integer=} params.pageSize Maximum number of items to return. Zero or unspecified indicates that the server may assign a maximum.  The server may return fewer than the specified number of results.
         * @param {string=} params.pageToken nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned.  The list request must be otherwise identical to the one that resulted in this token.
         * @param {string=} params.studentId Restricts returned courses to those having a student with the specified identifier. The identifier can be one of the following:  * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user
         * @param {string=} params.teacherId Restricts returned courses to those having a teacher with the specified identifier. The identifier can be one of the following:  * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Courses$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Courses$List, options?: MethodOptions): GaxiosPromise<Schema$ListCoursesResponse>;
        list(params: Params$Resource$Courses$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Courses$List, options: MethodOptions | BodyResponseCallback<Schema$ListCoursesResponse>, callback: BodyResponseCallback<Schema$ListCoursesResponse>): void;
        list(params: Params$Resource$Courses$List, callback: BodyResponseCallback<Schema$ListCoursesResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListCoursesResponse>): void;
        /**
         * classroom.courses.patch
         * @desc Updates one or more fields in a course.  This method returns the following error codes:  * `PERMISSION_DENIED` if the requesting user is not permitted to modify the requested course or for access errors. * `NOT_FOUND` if no course exists with the requested ID. * `INVALID_ARGUMENT` if invalid fields are specified in the update mask or if no update mask is supplied. * `FAILED_PRECONDITION` for the following request errors:     * CourseNotModifiable
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/classroom.courses'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.courses.patch({
         *     // Identifier of the course to update.
         *     // This identifier can be either the Classroom-assigned identifier or an
         *     // alias.
         *     id: 'placeholder-value',
         *     // Mask that identifies which fields on the course to update.
         *     // This field is required to do an update. The update will fail if invalid
         *     // fields are specified. The following fields are valid:
         *     //
         *     // * `name`
         *     // * `section`
         *     // * `descriptionHeading`
         *     // * `description`
         *     // * `room`
         *     // * `courseState`
         *     // * `ownerId`
         *     //
         *     // Note: patches to ownerId are treated as being effective immediately, but in
         *     // practice it may take some time for the ownership transfer of all affected
         *     // resources to complete.
         *     //
         *     // When set in a query parameter, this field should be specified as
         *     //
         *     // `updateMask=<field1>,<field2>,...`
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "alternateLink": "my_alternateLink",
         *       //   "calendarId": "my_calendarId",
         *       //   "courseGroupEmail": "my_courseGroupEmail",
         *       //   "courseMaterialSets": [],
         *       //   "courseState": "my_courseState",
         *       //   "creationTime": "my_creationTime",
         *       //   "description": "my_description",
         *       //   "descriptionHeading": "my_descriptionHeading",
         *       //   "enrollmentCode": "my_enrollmentCode",
         *       //   "guardiansEnabled": false,
         *       //   "id": "my_id",
         *       //   "name": "my_name",
         *       //   "ownerId": "my_ownerId",
         *       //   "room": "my_room",
         *       //   "section": "my_section",
         *       //   "teacherFolder": {},
         *       //   "teacherGroupEmail": "my_teacherGroupEmail",
         *       //   "updateTime": "my_updateTime"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "alternateLink": "my_alternateLink",
         *   //   "calendarId": "my_calendarId",
         *   //   "courseGroupEmail": "my_courseGroupEmail",
         *   //   "courseMaterialSets": [],
         *   //   "courseState": "my_courseState",
         *   //   "creationTime": "my_creationTime",
         *   //   "description": "my_description",
         *   //   "descriptionHeading": "my_descriptionHeading",
         *   //   "enrollmentCode": "my_enrollmentCode",
         *   //   "guardiansEnabled": false,
         *   //   "id": "my_id",
         *   //   "name": "my_name",
         *   //   "ownerId": "my_ownerId",
         *   //   "room": "my_room",
         *   //   "section": "my_section",
         *   //   "teacherFolder": {},
         *   //   "teacherGroupEmail": "my_teacherGroupEmail",
         *   //   "updateTime": "my_updateTime"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.courses.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.id Identifier of the course to update. This identifier can be either the Classroom-assigned identifier or an alias.
         * @param {string=} params.updateMask Mask that identifies which fields on the course to update. This field is required to do an update. The update will fail if invalid fields are specified. The following fields are valid:  * `name` * `section` * `descriptionHeading` * `description` * `room` * `courseState` * `ownerId`  Note: patches to ownerId are treated as being effective immediately, but in practice it may take some time for the ownership transfer of all affected resources to complete.  When set in a query parameter, this field should be specified as  `updateMask=<field1>,<field2>,...`
         * @param {().Course} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Courses$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Courses$Patch, options?: MethodOptions): GaxiosPromise<Schema$Course>;
        patch(params: Params$Resource$Courses$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Courses$Patch, options: MethodOptions | BodyResponseCallback<Schema$Course>, callback: BodyResponseCallback<Schema$Course>): void;
        patch(params: Params$Resource$Courses$Patch, callback: BodyResponseCallback<Schema$Course>): void;
        patch(callback: BodyResponseCallback<Schema$Course>): void;
        /**
         * classroom.courses.update
         * @desc Updates a course.  This method returns the following error codes:  * `PERMISSION_DENIED` if the requesting user is not permitted to modify the requested course or for access errors. * `NOT_FOUND` if no course exists with the requested ID. * `FAILED_PRECONDITION` for the following request errors:     * CourseNotModifiable
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/classroom.courses'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.courses.update({
         *     // Identifier of the course to update.
         *     // This identifier can be either the Classroom-assigned identifier or an
         *     // alias.
         *     id: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "alternateLink": "my_alternateLink",
         *       //   "calendarId": "my_calendarId",
         *       //   "courseGroupEmail": "my_courseGroupEmail",
         *       //   "courseMaterialSets": [],
         *       //   "courseState": "my_courseState",
         *       //   "creationTime": "my_creationTime",
         *       //   "description": "my_description",
         *       //   "descriptionHeading": "my_descriptionHeading",
         *       //   "enrollmentCode": "my_enrollmentCode",
         *       //   "guardiansEnabled": false,
         *       //   "id": "my_id",
         *       //   "name": "my_name",
         *       //   "ownerId": "my_ownerId",
         *       //   "room": "my_room",
         *       //   "section": "my_section",
         *       //   "teacherFolder": {},
         *       //   "teacherGroupEmail": "my_teacherGroupEmail",
         *       //   "updateTime": "my_updateTime"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "alternateLink": "my_alternateLink",
         *   //   "calendarId": "my_calendarId",
         *   //   "courseGroupEmail": "my_courseGroupEmail",
         *   //   "courseMaterialSets": [],
         *   //   "courseState": "my_courseState",
         *   //   "creationTime": "my_creationTime",
         *   //   "description": "my_description",
         *   //   "descriptionHeading": "my_descriptionHeading",
         *   //   "enrollmentCode": "my_enrollmentCode",
         *   //   "guardiansEnabled": false,
         *   //   "id": "my_id",
         *   //   "name": "my_name",
         *   //   "ownerId": "my_ownerId",
         *   //   "room": "my_room",
         *   //   "section": "my_section",
         *   //   "teacherFolder": {},
         *   //   "teacherGroupEmail": "my_teacherGroupEmail",
         *   //   "updateTime": "my_updateTime"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.courses.update
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.id Identifier of the course to update. This identifier can be either the Classroom-assigned identifier or an alias.
         * @param {().Course} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        update(params: Params$Resource$Courses$Update, options: StreamMethodOptions): GaxiosPromise<Readable>;
        update(params?: Params$Resource$Courses$Update, options?: MethodOptions): GaxiosPromise<Schema$Course>;
        update(params: Params$Resource$Courses$Update, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        update(params: Params$Resource$Courses$Update, options: MethodOptions | BodyResponseCallback<Schema$Course>, callback: BodyResponseCallback<Schema$Course>): void;
        update(params: Params$Resource$Courses$Update, callback: BodyResponseCallback<Schema$Course>): void;
        update(callback: BodyResponseCallback<Schema$Course>): void;
    }
    export interface Params$Resource$Courses$Create extends StandardParameters {
        /**
         * Request body metadata
         */
        requestBody?: Schema$Course;
    }
    export interface Params$Resource$Courses$Delete extends StandardParameters {
        /**
         * Identifier of the course to delete. This identifier can be either the Classroom-assigned identifier or an alias.
         */
        id?: string;
    }
    export interface Params$Resource$Courses$Get extends StandardParameters {
        /**
         * Identifier of the course to return. This identifier can be either the Classroom-assigned identifier or an alias.
         */
        id?: string;
    }
    export interface Params$Resource$Courses$List extends StandardParameters {
        /**
         * Restricts returned courses to those in one of the specified states The default value is ACTIVE, ARCHIVED, PROVISIONED, DECLINED.
         */
        courseStates?: string[];
        /**
         * Maximum number of items to return. Zero or unspecified indicates that the server may assign a maximum.  The server may return fewer than the specified number of results.
         */
        pageSize?: number;
        /**
         * nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned.  The list request must be otherwise identical to the one that resulted in this token.
         */
        pageToken?: string;
        /**
         * Restricts returned courses to those having a student with the specified identifier. The identifier can be one of the following:  * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user
         */
        studentId?: string;
        /**
         * Restricts returned courses to those having a teacher with the specified identifier. The identifier can be one of the following:  * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user
         */
        teacherId?: string;
    }
    export interface Params$Resource$Courses$Patch extends StandardParameters {
        /**
         * Identifier of the course to update. This identifier can be either the Classroom-assigned identifier or an alias.
         */
        id?: string;
        /**
         * Mask that identifies which fields on the course to update. This field is required to do an update. The update will fail if invalid fields are specified. The following fields are valid:  * `name` * `section` * `descriptionHeading` * `description` * `room` * `courseState` * `ownerId`  Note: patches to ownerId are treated as being effective immediately, but in practice it may take some time for the ownership transfer of all affected resources to complete.  When set in a query parameter, this field should be specified as  `updateMask=<field1>,<field2>,...`
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Course;
    }
    export interface Params$Resource$Courses$Update extends StandardParameters {
        /**
         * Identifier of the course to update. This identifier can be either the Classroom-assigned identifier or an alias.
         */
        id?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Course;
    }
    export class Resource$Courses$Aliases {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * classroom.courses.aliases.create
         * @desc Creates an alias for a course.  This method returns the following error codes:  * `PERMISSION_DENIED` if the requesting user is not permitted to create the alias or for access errors. * `NOT_FOUND` if the course does not exist. * `ALREADY_EXISTS` if the alias already exists. * `FAILED_PRECONDITION` if the alias requested does not make sense for the   requesting user or course (for example, if a user not in a domain   attempts to access a domain-scoped alias).
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/classroom.courses'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.courses.aliases.create({
         *     // Identifier of the course to alias.
         *     // This identifier can be either the Classroom-assigned identifier or an
         *     // alias.
         *     courseId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "alias": "my_alias"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "alias": "my_alias"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.courses.aliases.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.courseId Identifier of the course to alias. This identifier can be either the Classroom-assigned identifier or an alias.
         * @param {().CourseAlias} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Courses$Aliases$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Courses$Aliases$Create, options?: MethodOptions): GaxiosPromise<Schema$CourseAlias>;
        create(params: Params$Resource$Courses$Aliases$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Courses$Aliases$Create, options: MethodOptions | BodyResponseCallback<Schema$CourseAlias>, callback: BodyResponseCallback<Schema$CourseAlias>): void;
        create(params: Params$Resource$Courses$Aliases$Create, callback: BodyResponseCallback<Schema$CourseAlias>): void;
        create(callback: BodyResponseCallback<Schema$CourseAlias>): void;
        /**
         * classroom.courses.aliases.delete
         * @desc Deletes an alias of a course.  This method returns the following error codes:  * `PERMISSION_DENIED` if the requesting user is not permitted to remove the alias or for access errors. * `NOT_FOUND` if the alias does not exist. * `FAILED_PRECONDITION` if the alias requested does not make sense for the   requesting user or course (for example, if a user not in a domain   attempts to delete a domain-scoped alias).
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/classroom.courses'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.courses.aliases.delete({
         *     // Alias to delete.
         *     // This may not be the Classroom-assigned identifier.
         *     alias: 'placeholder-value',
         *     // Identifier of the course whose alias should be deleted.
         *     // This identifier can be either the Classroom-assigned identifier or an
         *     // alias.
         *     courseId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {}
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.courses.aliases.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.alias Alias to delete. This may not be the Classroom-assigned identifier.
         * @param {string} params.courseId Identifier of the course whose alias should be deleted. This identifier can be either the Classroom-assigned identifier or an alias.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Courses$Aliases$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Courses$Aliases$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Courses$Aliases$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Courses$Aliases$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Courses$Aliases$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * classroom.courses.aliases.list
         * @desc Returns a list of aliases for a course.  This method returns the following error codes:  * `PERMISSION_DENIED` if the requesting user is not permitted to access the course or for access errors. * `NOT_FOUND` if the course does not exist.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/classroom.courses',
         *       'https://www.googleapis.com/auth/classroom.courses.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.courses.aliases.list({
         *     // The identifier of the course.
         *     // This identifier can be either the Classroom-assigned identifier or an
         *     // alias.
         *     courseId: 'placeholder-value',
         *     // Maximum number of items to return. Zero or unspecified indicates that the
         *     // server may assign a maximum.
         *     //
         *     // The server may return fewer than the specified number of results.
         *     pageSize: 'placeholder-value',
         *     // nextPageToken
         *     // value returned from a previous
         *     // list call,
         *     // indicating that the subsequent page of results should be returned.
         *     //
         *     // The list request
         *     // must be otherwise identical to the one that resulted in this token.
         *     pageToken: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "aliases": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.courses.aliases.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.courseId The identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         * @param {integer=} params.pageSize Maximum number of items to return. Zero or unspecified indicates that the server may assign a maximum.  The server may return fewer than the specified number of results.
         * @param {string=} params.pageToken nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned.  The list request must be otherwise identical to the one that resulted in this token.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Courses$Aliases$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Courses$Aliases$List, options?: MethodOptions): GaxiosPromise<Schema$ListCourseAliasesResponse>;
        list(params: Params$Resource$Courses$Aliases$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Courses$Aliases$List, options: MethodOptions | BodyResponseCallback<Schema$ListCourseAliasesResponse>, callback: BodyResponseCallback<Schema$ListCourseAliasesResponse>): void;
        list(params: Params$Resource$Courses$Aliases$List, callback: BodyResponseCallback<Schema$ListCourseAliasesResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListCourseAliasesResponse>): void;
    }
    export interface Params$Resource$Courses$Aliases$Create extends StandardParameters {
        /**
         * Identifier of the course to alias. This identifier can be either the Classroom-assigned identifier or an alias.
         */
        courseId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$CourseAlias;
    }
    export interface Params$Resource$Courses$Aliases$Delete extends StandardParameters {
        /**
         * Alias to delete. This may not be the Classroom-assigned identifier.
         */
        alias?: string;
        /**
         * Identifier of the course whose alias should be deleted. This identifier can be either the Classroom-assigned identifier or an alias.
         */
        courseId?: string;
    }
    export interface Params$Resource$Courses$Aliases$List extends StandardParameters {
        /**
         * The identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         */
        courseId?: string;
        /**
         * Maximum number of items to return. Zero or unspecified indicates that the server may assign a maximum.  The server may return fewer than the specified number of results.
         */
        pageSize?: number;
        /**
         * nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned.  The list request must be otherwise identical to the one that resulted in this token.
         */
        pageToken?: string;
    }
    export class Resource$Courses$Announcements {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * classroom.courses.announcements.create
         * @desc Creates an announcement.  This method returns the following error codes:  * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course, create announcements in the requested course, share a Drive attachment, or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course does not exist. * `FAILED_PRECONDITION` for the following request error:     * AttachmentNotVisible
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/classroom.announcements'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.courses.announcements.create({
         *     // Identifier of the course.
         *     // This identifier can be either the Classroom-assigned identifier or an
         *     // alias.
         *     courseId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "alternateLink": "my_alternateLink",
         *       //   "assigneeMode": "my_assigneeMode",
         *       //   "courseId": "my_courseId",
         *       //   "creationTime": "my_creationTime",
         *       //   "creatorUserId": "my_creatorUserId",
         *       //   "id": "my_id",
         *       //   "individualStudentsOptions": {},
         *       //   "materials": [],
         *       //   "scheduledTime": "my_scheduledTime",
         *       //   "state": "my_state",
         *       //   "text": "my_text",
         *       //   "updateTime": "my_updateTime"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "alternateLink": "my_alternateLink",
         *   //   "assigneeMode": "my_assigneeMode",
         *   //   "courseId": "my_courseId",
         *   //   "creationTime": "my_creationTime",
         *   //   "creatorUserId": "my_creatorUserId",
         *   //   "id": "my_id",
         *   //   "individualStudentsOptions": {},
         *   //   "materials": [],
         *   //   "scheduledTime": "my_scheduledTime",
         *   //   "state": "my_state",
         *   //   "text": "my_text",
         *   //   "updateTime": "my_updateTime"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.courses.announcements.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         * @param {().Announcement} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Courses$Announcements$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Courses$Announcements$Create, options?: MethodOptions): GaxiosPromise<Schema$Announcement>;
        create(params: Params$Resource$Courses$Announcements$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Courses$Announcements$Create, options: MethodOptions | BodyResponseCallback<Schema$Announcement>, callback: BodyResponseCallback<Schema$Announcement>): void;
        create(params: Params$Resource$Courses$Announcements$Create, callback: BodyResponseCallback<Schema$Announcement>): void;
        create(callback: BodyResponseCallback<Schema$Announcement>): void;
        /**
         * classroom.courses.announcements.delete
         * @desc Deletes an announcement.  This request must be made by the Developer Console project of the [OAuth client ID](https://support.google.com/cloud/answer/6158849) used to create the corresponding announcement item.  This method returns the following error codes:  * `PERMISSION_DENIED` if the requesting developer project did not create the corresponding announcement, if the requesting user is not permitted to delete the requested course or for access errors. * `FAILED_PRECONDITION` if the requested announcement has already been deleted. * `NOT_FOUND` if no course exists with the requested ID.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/classroom.announcements'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.courses.announcements.delete({
         *     // Identifier of the course.
         *     // This identifier can be either the Classroom-assigned identifier or an
         *     // alias.
         *     courseId: 'placeholder-value',
         *     // Identifier of the announcement to delete.
         *     // This identifier is a Classroom-assigned identifier.
         *     id: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {}
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.courses.announcements.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         * @param {string} params.id Identifier of the announcement to delete. This identifier is a Classroom-assigned identifier.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Courses$Announcements$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Courses$Announcements$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Courses$Announcements$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Courses$Announcements$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Courses$Announcements$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * classroom.courses.announcements.get
         * @desc Returns an announcement.  This method returns the following error codes:  * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or announcement, or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course or announcement does not exist.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/classroom.announcements',
         *       'https://www.googleapis.com/auth/classroom.announcements.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.courses.announcements.get({
         *     // Identifier of the course.
         *     // This identifier can be either the Classroom-assigned identifier or an
         *     // alias.
         *     courseId: 'placeholder-value',
         *     // Identifier of the announcement.
         *     id: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "alternateLink": "my_alternateLink",
         *   //   "assigneeMode": "my_assigneeMode",
         *   //   "courseId": "my_courseId",
         *   //   "creationTime": "my_creationTime",
         *   //   "creatorUserId": "my_creatorUserId",
         *   //   "id": "my_id",
         *   //   "individualStudentsOptions": {},
         *   //   "materials": [],
         *   //   "scheduledTime": "my_scheduledTime",
         *   //   "state": "my_state",
         *   //   "text": "my_text",
         *   //   "updateTime": "my_updateTime"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.courses.announcements.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         * @param {string} params.id Identifier of the announcement.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Courses$Announcements$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Courses$Announcements$Get, options?: MethodOptions): GaxiosPromise<Schema$Announcement>;
        get(params: Params$Resource$Courses$Announcements$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Courses$Announcements$Get, options: MethodOptions | BodyResponseCallback<Schema$Announcement>, callback: BodyResponseCallback<Schema$Announcement>): void;
        get(params: Params$Resource$Courses$Announcements$Get, callback: BodyResponseCallback<Schema$Announcement>): void;
        get(callback: BodyResponseCallback<Schema$Announcement>): void;
        /**
         * classroom.courses.announcements.list
         * @desc Returns a list of announcements that the requester is permitted to view.  Course students may only view `PUBLISHED` announcements. Course teachers and domain administrators may view all announcements.  This method returns the following error codes:  * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course does not exist.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/classroom.announcements',
         *       'https://www.googleapis.com/auth/classroom.announcements.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.courses.announcements.list({
         *     // Restriction on the `state` of announcements returned.
         *     // If this argument is left unspecified, the default value is `PUBLISHED`.
         *     announcementStates: 'placeholder-value',
         *     // Identifier of the course.
         *     // This identifier can be either the Classroom-assigned identifier or an
         *     // alias.
         *     courseId: 'placeholder-value',
         *     // Optional sort ordering for results. A comma-separated list of fields with
         *     // an optional sort direction keyword. Supported field is `updateTime`.
         *     // Supported direction keywords are `asc` and `desc`.
         *     // If not specified, `updateTime desc` is the default behavior.
         *     // Examples: `updateTime asc`, `updateTime`
         *     orderBy: 'placeholder-value',
         *     // Maximum number of items to return. Zero or unspecified indicates that the
         *     // server may assign a maximum.
         *     //
         *     // The server may return fewer than the specified number of results.
         *     pageSize: 'placeholder-value',
         *     // nextPageToken
         *     // value returned from a previous
         *     // list call,
         *     // indicating that the subsequent page of results should be returned.
         *     //
         *     // The list request
         *     // must be otherwise identical to the one that resulted in this token.
         *     pageToken: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "announcements": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.courses.announcements.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.announcementStates Restriction on the `state` of announcements returned. If this argument is left unspecified, the default value is `PUBLISHED`.
         * @param {string} params.courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         * @param {string=} params.orderBy Optional sort ordering for results. A comma-separated list of fields with an optional sort direction keyword. Supported field is `updateTime`. Supported direction keywords are `asc` and `desc`. If not specified, `updateTime desc` is the default behavior. Examples: `updateTime asc`, `updateTime`
         * @param {integer=} params.pageSize Maximum number of items to return. Zero or unspecified indicates that the server may assign a maximum.  The server may return fewer than the specified number of results.
         * @param {string=} params.pageToken nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned.  The list request must be otherwise identical to the one that resulted in this token.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Courses$Announcements$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Courses$Announcements$List, options?: MethodOptions): GaxiosPromise<Schema$ListAnnouncementsResponse>;
        list(params: Params$Resource$Courses$Announcements$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Courses$Announcements$List, options: MethodOptions | BodyResponseCallback<Schema$ListAnnouncementsResponse>, callback: BodyResponseCallback<Schema$ListAnnouncementsResponse>): void;
        list(params: Params$Resource$Courses$Announcements$List, callback: BodyResponseCallback<Schema$ListAnnouncementsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListAnnouncementsResponse>): void;
        /**
         * classroom.courses.announcements.modifyAssignees
         * @desc Modifies assignee mode and options of an announcement.  Only a teacher of the course that contains the announcement may call this method.  This method returns the following error codes:  * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or course work or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course or course work does not exist.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/classroom.announcements'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.courses.announcements.modifyAssignees({
         *     // Identifier of the course.
         *     // This identifier can be either the Classroom-assigned identifier or an
         *     // alias.
         *     courseId: 'placeholder-value',
         *     // Identifier of the announcement.
         *     id: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "assigneeMode": "my_assigneeMode",
         *       //   "modifyIndividualStudentsOptions": {}
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "alternateLink": "my_alternateLink",
         *   //   "assigneeMode": "my_assigneeMode",
         *   //   "courseId": "my_courseId",
         *   //   "creationTime": "my_creationTime",
         *   //   "creatorUserId": "my_creatorUserId",
         *   //   "id": "my_id",
         *   //   "individualStudentsOptions": {},
         *   //   "materials": [],
         *   //   "scheduledTime": "my_scheduledTime",
         *   //   "state": "my_state",
         *   //   "text": "my_text",
         *   //   "updateTime": "my_updateTime"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.courses.announcements.modifyAssignees
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         * @param {string} params.id Identifier of the announcement.
         * @param {().ModifyAnnouncementAssigneesRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        modifyAssignees(params: Params$Resource$Courses$Announcements$Modifyassignees, options: StreamMethodOptions): GaxiosPromise<Readable>;
        modifyAssignees(params?: Params$Resource$Courses$Announcements$Modifyassignees, options?: MethodOptions): GaxiosPromise<Schema$Announcement>;
        modifyAssignees(params: Params$Resource$Courses$Announcements$Modifyassignees, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        modifyAssignees(params: Params$Resource$Courses$Announcements$Modifyassignees, options: MethodOptions | BodyResponseCallback<Schema$Announcement>, callback: BodyResponseCallback<Schema$Announcement>): void;
        modifyAssignees(params: Params$Resource$Courses$Announcements$Modifyassignees, callback: BodyResponseCallback<Schema$Announcement>): void;
        modifyAssignees(callback: BodyResponseCallback<Schema$Announcement>): void;
        /**
         * classroom.courses.announcements.patch
         * @desc Updates one or more fields of an announcement.  This method returns the following error codes:  * `PERMISSION_DENIED` if the requesting developer project did not create the corresponding announcement or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `FAILED_PRECONDITION` if the requested announcement has already been deleted. * `NOT_FOUND` if the requested course or announcement does not exist
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/classroom.announcements'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.courses.announcements.patch({
         *     // Identifier of the course.
         *     // This identifier can be either the Classroom-assigned identifier or an
         *     // alias.
         *     courseId: 'placeholder-value',
         *     // Identifier of the announcement.
         *     id: 'placeholder-value',
         *     // Mask that identifies which fields on the announcement to update.
         *     // This field is required to do an update. The update fails if invalid
         *     // fields are specified. If a field supports empty values, it can be cleared
         *     // by specifying it in the update mask and not in the Announcement object. If
         *     // a field that does not support empty values is included in the update mask
         *     // and not set in the Announcement object, an `INVALID_ARGUMENT` error is
         *     // returned.
         *     //
         *     // The following fields may be specified by teachers:
         *     //
         *     // * `text`
         *     // * `state`
         *     // * `scheduled_time`
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "alternateLink": "my_alternateLink",
         *       //   "assigneeMode": "my_assigneeMode",
         *       //   "courseId": "my_courseId",
         *       //   "creationTime": "my_creationTime",
         *       //   "creatorUserId": "my_creatorUserId",
         *       //   "id": "my_id",
         *       //   "individualStudentsOptions": {},
         *       //   "materials": [],
         *       //   "scheduledTime": "my_scheduledTime",
         *       //   "state": "my_state",
         *       //   "text": "my_text",
         *       //   "updateTime": "my_updateTime"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "alternateLink": "my_alternateLink",
         *   //   "assigneeMode": "my_assigneeMode",
         *   //   "courseId": "my_courseId",
         *   //   "creationTime": "my_creationTime",
         *   //   "creatorUserId": "my_creatorUserId",
         *   //   "id": "my_id",
         *   //   "individualStudentsOptions": {},
         *   //   "materials": [],
         *   //   "scheduledTime": "my_scheduledTime",
         *   //   "state": "my_state",
         *   //   "text": "my_text",
         *   //   "updateTime": "my_updateTime"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.courses.announcements.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         * @param {string} params.id Identifier of the announcement.
         * @param {string=} params.updateMask Mask that identifies which fields on the announcement to update. This field is required to do an update. The update fails if invalid fields are specified. If a field supports empty values, it can be cleared by specifying it in the update mask and not in the Announcement object. If a field that does not support empty values is included in the update mask and not set in the Announcement object, an `INVALID_ARGUMENT` error is returned.  The following fields may be specified by teachers:  * `text` * `state` * `scheduled_time`
         * @param {().Announcement} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Courses$Announcements$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Courses$Announcements$Patch, options?: MethodOptions): GaxiosPromise<Schema$Announcement>;
        patch(params: Params$Resource$Courses$Announcements$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Courses$Announcements$Patch, options: MethodOptions | BodyResponseCallback<Schema$Announcement>, callback: BodyResponseCallback<Schema$Announcement>): void;
        patch(params: Params$Resource$Courses$Announcements$Patch, callback: BodyResponseCallback<Schema$Announcement>): void;
        patch(callback: BodyResponseCallback<Schema$Announcement>): void;
    }
    export interface Params$Resource$Courses$Announcements$Create extends StandardParameters {
        /**
         * Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         */
        courseId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Announcement;
    }
    export interface Params$Resource$Courses$Announcements$Delete extends StandardParameters {
        /**
         * Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         */
        courseId?: string;
        /**
         * Identifier of the announcement to delete. This identifier is a Classroom-assigned identifier.
         */
        id?: string;
    }
    export interface Params$Resource$Courses$Announcements$Get extends StandardParameters {
        /**
         * Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         */
        courseId?: string;
        /**
         * Identifier of the announcement.
         */
        id?: string;
    }
    export interface Params$Resource$Courses$Announcements$List extends StandardParameters {
        /**
         * Restriction on the `state` of announcements returned. If this argument is left unspecified, the default value is `PUBLISHED`.
         */
        announcementStates?: string[];
        /**
         * Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         */
        courseId?: string;
        /**
         * Optional sort ordering for results. A comma-separated list of fields with an optional sort direction keyword. Supported field is `updateTime`. Supported direction keywords are `asc` and `desc`. If not specified, `updateTime desc` is the default behavior. Examples: `updateTime asc`, `updateTime`
         */
        orderBy?: string;
        /**
         * Maximum number of items to return. Zero or unspecified indicates that the server may assign a maximum.  The server may return fewer than the specified number of results.
         */
        pageSize?: number;
        /**
         * nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned.  The list request must be otherwise identical to the one that resulted in this token.
         */
        pageToken?: string;
    }
    export interface Params$Resource$Courses$Announcements$Modifyassignees extends StandardParameters {
        /**
         * Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         */
        courseId?: string;
        /**
         * Identifier of the announcement.
         */
        id?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$ModifyAnnouncementAssigneesRequest;
    }
    export interface Params$Resource$Courses$Announcements$Patch extends StandardParameters {
        /**
         * Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         */
        courseId?: string;
        /**
         * Identifier of the announcement.
         */
        id?: string;
        /**
         * Mask that identifies which fields on the announcement to update. This field is required to do an update. The update fails if invalid fields are specified. If a field supports empty values, it can be cleared by specifying it in the update mask and not in the Announcement object. If a field that does not support empty values is included in the update mask and not set in the Announcement object, an `INVALID_ARGUMENT` error is returned.  The following fields may be specified by teachers:  * `text` * `state` * `scheduled_time`
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Announcement;
    }
    export class Resource$Courses$Coursework {
        context: APIRequestContext;
        studentSubmissions: Resource$Courses$Coursework$Studentsubmissions;
        constructor(context: APIRequestContext);
        /**
         * classroom.courses.courseWork.create
         * @desc Creates course work.  The resulting course work (and corresponding student submissions) are associated with the Developer Console project of the [OAuth client ID](https://support.google.com/cloud/answer/6158849) used to make the request. Classroom API requests to modify course work and student submissions must be made with an OAuth client ID from the associated Developer Console project.  This method returns the following error codes:  * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course, create course work in the requested course, share a Drive attachment, or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course does not exist. * `FAILED_PRECONDITION` for the following request error:     * AttachmentNotVisible
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/classroom.coursework.students'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.courses.courseWork.create({
         *     // Identifier of the course.
         *     // This identifier can be either the Classroom-assigned identifier or an
         *     // alias.
         *     courseId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "alternateLink": "my_alternateLink",
         *       //   "assigneeMode": "my_assigneeMode",
         *       //   "assignment": {},
         *       //   "associatedWithDeveloper": false,
         *       //   "courseId": "my_courseId",
         *       //   "creationTime": "my_creationTime",
         *       //   "creatorUserId": "my_creatorUserId",
         *       //   "description": "my_description",
         *       //   "dueDate": {},
         *       //   "dueTime": {},
         *       //   "id": "my_id",
         *       //   "individualStudentsOptions": {},
         *       //   "materials": [],
         *       //   "maxPoints": {},
         *       //   "multipleChoiceQuestion": {},
         *       //   "scheduledTime": "my_scheduledTime",
         *       //   "state": "my_state",
         *       //   "submissionModificationMode": "my_submissionModificationMode",
         *       //   "title": "my_title",
         *       //   "topicId": "my_topicId",
         *       //   "updateTime": "my_updateTime",
         *       //   "workType": "my_workType"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "alternateLink": "my_alternateLink",
         *   //   "assigneeMode": "my_assigneeMode",
         *   //   "assignment": {},
         *   //   "associatedWithDeveloper": false,
         *   //   "courseId": "my_courseId",
         *   //   "creationTime": "my_creationTime",
         *   //   "creatorUserId": "my_creatorUserId",
         *   //   "description": "my_description",
         *   //   "dueDate": {},
         *   //   "dueTime": {},
         *   //   "id": "my_id",
         *   //   "individualStudentsOptions": {},
         *   //   "materials": [],
         *   //   "maxPoints": {},
         *   //   "multipleChoiceQuestion": {},
         *   //   "scheduledTime": "my_scheduledTime",
         *   //   "state": "my_state",
         *   //   "submissionModificationMode": "my_submissionModificationMode",
         *   //   "title": "my_title",
         *   //   "topicId": "my_topicId",
         *   //   "updateTime": "my_updateTime",
         *   //   "workType": "my_workType"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.courses.courseWork.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         * @param {().CourseWork} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Courses$Coursework$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Courses$Coursework$Create, options?: MethodOptions): GaxiosPromise<Schema$CourseWork>;
        create(params: Params$Resource$Courses$Coursework$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Courses$Coursework$Create, options: MethodOptions | BodyResponseCallback<Schema$CourseWork>, callback: BodyResponseCallback<Schema$CourseWork>): void;
        create(params: Params$Resource$Courses$Coursework$Create, callback: BodyResponseCallback<Schema$CourseWork>): void;
        create(callback: BodyResponseCallback<Schema$CourseWork>): void;
        /**
         * classroom.courses.courseWork.delete
         * @desc Deletes a course work.  This request must be made by the Developer Console project of the [OAuth client ID](https://support.google.com/cloud/answer/6158849) used to create the corresponding course work item.  This method returns the following error codes:  * `PERMISSION_DENIED` if the requesting developer project did not create the corresponding course work, if the requesting user is not permitted to delete the requested course or for access errors. * `FAILED_PRECONDITION` if the requested course work has already been deleted. * `NOT_FOUND` if no course exists with the requested ID.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/classroom.coursework.students'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.courses.courseWork.delete({
         *     // Identifier of the course.
         *     // This identifier can be either the Classroom-assigned identifier or an
         *     // alias.
         *     courseId: 'placeholder-value',
         *     // Identifier of the course work to delete.
         *     // This identifier is a Classroom-assigned identifier.
         *     id: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {}
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.courses.courseWork.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         * @param {string} params.id Identifier of the course work to delete. This identifier is a Classroom-assigned identifier.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Courses$Coursework$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Courses$Coursework$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Courses$Coursework$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Courses$Coursework$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Courses$Coursework$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * classroom.courses.courseWork.get
         * @desc Returns course work.  This method returns the following error codes:  * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or course work, or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course or course work does not exist.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/classroom.coursework.me',
         *       'https://www.googleapis.com/auth/classroom.coursework.me.readonly',
         *       'https://www.googleapis.com/auth/classroom.coursework.students',
         *       'https://www.googleapis.com/auth/classroom.coursework.students.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.courses.courseWork.get({
         *     // Identifier of the course.
         *     // This identifier can be either the Classroom-assigned identifier or an
         *     // alias.
         *     courseId: 'placeholder-value',
         *     // Identifier of the course work.
         *     id: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "alternateLink": "my_alternateLink",
         *   //   "assigneeMode": "my_assigneeMode",
         *   //   "assignment": {},
         *   //   "associatedWithDeveloper": false,
         *   //   "courseId": "my_courseId",
         *   //   "creationTime": "my_creationTime",
         *   //   "creatorUserId": "my_creatorUserId",
         *   //   "description": "my_description",
         *   //   "dueDate": {},
         *   //   "dueTime": {},
         *   //   "id": "my_id",
         *   //   "individualStudentsOptions": {},
         *   //   "materials": [],
         *   //   "maxPoints": {},
         *   //   "multipleChoiceQuestion": {},
         *   //   "scheduledTime": "my_scheduledTime",
         *   //   "state": "my_state",
         *   //   "submissionModificationMode": "my_submissionModificationMode",
         *   //   "title": "my_title",
         *   //   "topicId": "my_topicId",
         *   //   "updateTime": "my_updateTime",
         *   //   "workType": "my_workType"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.courses.courseWork.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         * @param {string} params.id Identifier of the course work.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Courses$Coursework$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Courses$Coursework$Get, options?: MethodOptions): GaxiosPromise<Schema$CourseWork>;
        get(params: Params$Resource$Courses$Coursework$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Courses$Coursework$Get, options: MethodOptions | BodyResponseCallback<Schema$CourseWork>, callback: BodyResponseCallback<Schema$CourseWork>): void;
        get(params: Params$Resource$Courses$Coursework$Get, callback: BodyResponseCallback<Schema$CourseWork>): void;
        get(callback: BodyResponseCallback<Schema$CourseWork>): void;
        /**
         * classroom.courses.courseWork.list
         * @desc Returns a list of course work that the requester is permitted to view.  Course students may only view `PUBLISHED` course work. Course teachers and domain administrators may view all course work.  This method returns the following error codes:  * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course does not exist.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/classroom.coursework.me',
         *       'https://www.googleapis.com/auth/classroom.coursework.me.readonly',
         *       'https://www.googleapis.com/auth/classroom.coursework.students',
         *       'https://www.googleapis.com/auth/classroom.coursework.students.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.courses.courseWork.list({
         *     // Identifier of the course.
         *     // This identifier can be either the Classroom-assigned identifier or an
         *     // alias.
         *     courseId: 'placeholder-value',
         *     // Restriction on the work status to return. Only courseWork that matches
         *     // is returned. If unspecified, items with a work status of `PUBLISHED`
         *     // is returned.
         *     courseWorkStates: 'placeholder-value',
         *     // Optional sort ordering for results. A comma-separated list of fields with
         *     // an optional sort direction keyword. Supported fields are `updateTime`
         *     // and `dueDate`. Supported direction keywords are `asc` and `desc`.
         *     // If not specified, `updateTime desc` is the default behavior.
         *     // Examples: `dueDate asc,updateTime desc`, `updateTime,dueDate desc`
         *     orderBy: 'placeholder-value',
         *     // Maximum number of items to return. Zero or unspecified indicates that the
         *     // server may assign a maximum.
         *     //
         *     // The server may return fewer than the specified number of results.
         *     pageSize: 'placeholder-value',
         *     // nextPageToken
         *     // value returned from a previous
         *     // list call,
         *     // indicating that the subsequent page of results should be returned.
         *     //
         *     // The list request
         *     // must be otherwise identical to the one that resulted in this token.
         *     pageToken: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "courseWork": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.courses.courseWork.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         * @param {string=} params.courseWorkStates Restriction on the work status to return. Only courseWork that matches is returned. If unspecified, items with a work status of `PUBLISHED` is returned.
         * @param {string=} params.orderBy Optional sort ordering for results. A comma-separated list of fields with an optional sort direction keyword. Supported fields are `updateTime` and `dueDate`. Supported direction keywords are `asc` and `desc`. If not specified, `updateTime desc` is the default behavior. Examples: `dueDate asc,updateTime desc`, `updateTime,dueDate desc`
         * @param {integer=} params.pageSize Maximum number of items to return. Zero or unspecified indicates that the server may assign a maximum.  The server may return fewer than the specified number of results.
         * @param {string=} params.pageToken nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned.  The list request must be otherwise identical to the one that resulted in this token.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Courses$Coursework$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Courses$Coursework$List, options?: MethodOptions): GaxiosPromise<Schema$ListCourseWorkResponse>;
        list(params: Params$Resource$Courses$Coursework$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Courses$Coursework$List, options: MethodOptions | BodyResponseCallback<Schema$ListCourseWorkResponse>, callback: BodyResponseCallback<Schema$ListCourseWorkResponse>): void;
        list(params: Params$Resource$Courses$Coursework$List, callback: BodyResponseCallback<Schema$ListCourseWorkResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListCourseWorkResponse>): void;
        /**
         * classroom.courses.courseWork.modifyAssignees
         * @desc Modifies assignee mode and options of a coursework.  Only a teacher of the course that contains the coursework may call this method.  This method returns the following error codes:  * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or course work or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course or course work does not exist.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/classroom.coursework.students'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.courses.courseWork.modifyAssignees({
         *     // Identifier of the course.
         *     // This identifier can be either the Classroom-assigned identifier or an
         *     // alias.
         *     courseId: 'placeholder-value',
         *     // Identifier of the coursework.
         *     id: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "assigneeMode": "my_assigneeMode",
         *       //   "modifyIndividualStudentsOptions": {}
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "alternateLink": "my_alternateLink",
         *   //   "assigneeMode": "my_assigneeMode",
         *   //   "assignment": {},
         *   //   "associatedWithDeveloper": false,
         *   //   "courseId": "my_courseId",
         *   //   "creationTime": "my_creationTime",
         *   //   "creatorUserId": "my_creatorUserId",
         *   //   "description": "my_description",
         *   //   "dueDate": {},
         *   //   "dueTime": {},
         *   //   "id": "my_id",
         *   //   "individualStudentsOptions": {},
         *   //   "materials": [],
         *   //   "maxPoints": {},
         *   //   "multipleChoiceQuestion": {},
         *   //   "scheduledTime": "my_scheduledTime",
         *   //   "state": "my_state",
         *   //   "submissionModificationMode": "my_submissionModificationMode",
         *   //   "title": "my_title",
         *   //   "topicId": "my_topicId",
         *   //   "updateTime": "my_updateTime",
         *   //   "workType": "my_workType"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.courses.courseWork.modifyAssignees
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         * @param {string} params.id Identifier of the coursework.
         * @param {().ModifyCourseWorkAssigneesRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        modifyAssignees(params: Params$Resource$Courses$Coursework$Modifyassignees, options: StreamMethodOptions): GaxiosPromise<Readable>;
        modifyAssignees(params?: Params$Resource$Courses$Coursework$Modifyassignees, options?: MethodOptions): GaxiosPromise<Schema$CourseWork>;
        modifyAssignees(params: Params$Resource$Courses$Coursework$Modifyassignees, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        modifyAssignees(params: Params$Resource$Courses$Coursework$Modifyassignees, options: MethodOptions | BodyResponseCallback<Schema$CourseWork>, callback: BodyResponseCallback<Schema$CourseWork>): void;
        modifyAssignees(params: Params$Resource$Courses$Coursework$Modifyassignees, callback: BodyResponseCallback<Schema$CourseWork>): void;
        modifyAssignees(callback: BodyResponseCallback<Schema$CourseWork>): void;
        /**
         * classroom.courses.courseWork.patch
         * @desc Updates one or more fields of a course work.  See google.classroom.v1.CourseWork for details of which fields may be updated and who may change them.  This request must be made by the Developer Console project of the [OAuth client ID](https://support.google.com/cloud/answer/6158849) used to create the corresponding course work item.  This method returns the following error codes:  * `PERMISSION_DENIED` if the requesting developer project did not create the corresponding course work, if the user is not permitted to make the requested modification to the student submission, or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `FAILED_PRECONDITION` if the requested course work has already been deleted. * `NOT_FOUND` if the requested course, course work, or student submission does not exist.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/classroom.coursework.students'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.courses.courseWork.patch({
         *     // Identifier of the course.
         *     // This identifier can be either the Classroom-assigned identifier or an
         *     // alias.
         *     courseId: 'placeholder-value',
         *     // Identifier of the course work.
         *     id: 'placeholder-value',
         *     // Mask that identifies which fields on the course work to update.
         *     // This field is required to do an update. The update fails if invalid
         *     // fields are specified. If a field supports empty values, it can be cleared
         *     // by specifying it in the update mask and not in the CourseWork object. If a
         *     // field that does not support empty values is included in the update mask and
         *     // not set in the CourseWork object, an `INVALID_ARGUMENT` error is
         *     // returned.
         *     //
         *     // The following fields may be specified by teachers:
         *     //
         *     // * `title`
         *     // * `description`
         *     // * `state`
         *     // * `due_date`
         *     // * `due_time`
         *     // * `max_points`
         *     // * `scheduled_time`
         *     // * `submission_modification_mode`
         *     // * `topic_id`
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "alternateLink": "my_alternateLink",
         *       //   "assigneeMode": "my_assigneeMode",
         *       //   "assignment": {},
         *       //   "associatedWithDeveloper": false,
         *       //   "courseId": "my_courseId",
         *       //   "creationTime": "my_creationTime",
         *       //   "creatorUserId": "my_creatorUserId",
         *       //   "description": "my_description",
         *       //   "dueDate": {},
         *       //   "dueTime": {},
         *       //   "id": "my_id",
         *       //   "individualStudentsOptions": {},
         *       //   "materials": [],
         *       //   "maxPoints": {},
         *       //   "multipleChoiceQuestion": {},
         *       //   "scheduledTime": "my_scheduledTime",
         *       //   "state": "my_state",
         *       //   "submissionModificationMode": "my_submissionModificationMode",
         *       //   "title": "my_title",
         *       //   "topicId": "my_topicId",
         *       //   "updateTime": "my_updateTime",
         *       //   "workType": "my_workType"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "alternateLink": "my_alternateLink",
         *   //   "assigneeMode": "my_assigneeMode",
         *   //   "assignment": {},
         *   //   "associatedWithDeveloper": false,
         *   //   "courseId": "my_courseId",
         *   //   "creationTime": "my_creationTime",
         *   //   "creatorUserId": "my_creatorUserId",
         *   //   "description": "my_description",
         *   //   "dueDate": {},
         *   //   "dueTime": {},
         *   //   "id": "my_id",
         *   //   "individualStudentsOptions": {},
         *   //   "materials": [],
         *   //   "maxPoints": {},
         *   //   "multipleChoiceQuestion": {},
         *   //   "scheduledTime": "my_scheduledTime",
         *   //   "state": "my_state",
         *   //   "submissionModificationMode": "my_submissionModificationMode",
         *   //   "title": "my_title",
         *   //   "topicId": "my_topicId",
         *   //   "updateTime": "my_updateTime",
         *   //   "workType": "my_workType"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.courses.courseWork.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         * @param {string} params.id Identifier of the course work.
         * @param {string=} params.updateMask Mask that identifies which fields on the course work to update. This field is required to do an update. The update fails if invalid fields are specified. If a field supports empty values, it can be cleared by specifying it in the update mask and not in the CourseWork object. If a field that does not support empty values is included in the update mask and not set in the CourseWork object, an `INVALID_ARGUMENT` error is returned.  The following fields may be specified by teachers:  * `title` * `description` * `state` * `due_date` * `due_time` * `max_points` * `scheduled_time` * `submission_modification_mode` * `topic_id`
         * @param {().CourseWork} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Courses$Coursework$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Courses$Coursework$Patch, options?: MethodOptions): GaxiosPromise<Schema$CourseWork>;
        patch(params: Params$Resource$Courses$Coursework$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Courses$Coursework$Patch, options: MethodOptions | BodyResponseCallback<Schema$CourseWork>, callback: BodyResponseCallback<Schema$CourseWork>): void;
        patch(params: Params$Resource$Courses$Coursework$Patch, callback: BodyResponseCallback<Schema$CourseWork>): void;
        patch(callback: BodyResponseCallback<Schema$CourseWork>): void;
    }
    export interface Params$Resource$Courses$Coursework$Create extends StandardParameters {
        /**
         * Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         */
        courseId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$CourseWork;
    }
    export interface Params$Resource$Courses$Coursework$Delete extends StandardParameters {
        /**
         * Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         */
        courseId?: string;
        /**
         * Identifier of the course work to delete. This identifier is a Classroom-assigned identifier.
         */
        id?: string;
    }
    export interface Params$Resource$Courses$Coursework$Get extends StandardParameters {
        /**
         * Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         */
        courseId?: string;
        /**
         * Identifier of the course work.
         */
        id?: string;
    }
    export interface Params$Resource$Courses$Coursework$List extends StandardParameters {
        /**
         * Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         */
        courseId?: string;
        /**
         * Restriction on the work status to return. Only courseWork that matches is returned. If unspecified, items with a work status of `PUBLISHED` is returned.
         */
        courseWorkStates?: string[];
        /**
         * Optional sort ordering for results. A comma-separated list of fields with an optional sort direction keyword. Supported fields are `updateTime` and `dueDate`. Supported direction keywords are `asc` and `desc`. If not specified, `updateTime desc` is the default behavior. Examples: `dueDate asc,updateTime desc`, `updateTime,dueDate desc`
         */
        orderBy?: string;
        /**
         * Maximum number of items to return. Zero or unspecified indicates that the server may assign a maximum.  The server may return fewer than the specified number of results.
         */
        pageSize?: number;
        /**
         * nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned.  The list request must be otherwise identical to the one that resulted in this token.
         */
        pageToken?: string;
    }
    export interface Params$Resource$Courses$Coursework$Modifyassignees extends StandardParameters {
        /**
         * Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         */
        courseId?: string;
        /**
         * Identifier of the coursework.
         */
        id?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$ModifyCourseWorkAssigneesRequest;
    }
    export interface Params$Resource$Courses$Coursework$Patch extends StandardParameters {
        /**
         * Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         */
        courseId?: string;
        /**
         * Identifier of the course work.
         */
        id?: string;
        /**
         * Mask that identifies which fields on the course work to update. This field is required to do an update. The update fails if invalid fields are specified. If a field supports empty values, it can be cleared by specifying it in the update mask and not in the CourseWork object. If a field that does not support empty values is included in the update mask and not set in the CourseWork object, an `INVALID_ARGUMENT` error is returned.  The following fields may be specified by teachers:  * `title` * `description` * `state` * `due_date` * `due_time` * `max_points` * `scheduled_time` * `submission_modification_mode` * `topic_id`
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$CourseWork;
    }
    export class Resource$Courses$Coursework$Studentsubmissions {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * classroom.courses.courseWork.studentSubmissions.get
         * @desc Returns a student submission.  * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course, course work, or student submission or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course, course work, or student submission does not exist.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/classroom.coursework.me',
         *       'https://www.googleapis.com/auth/classroom.coursework.me.readonly',
         *       'https://www.googleapis.com/auth/classroom.coursework.students',
         *       'https://www.googleapis.com/auth/classroom.coursework.students.readonly',
         *       'https://www.googleapis.com/auth/classroom.student-submissions.me.readonly',
         *       'https://www.googleapis.com/auth/classroom.student-submissions.students.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.courses.courseWork.studentSubmissions.get({
         *     // Identifier of the course.
         *     // This identifier can be either the Classroom-assigned identifier or an
         *     // alias.
         *     courseId: 'placeholder-value',
         *     // Identifier of the course work.
         *     courseWorkId: 'placeholder-value',
         *     // Identifier of the student submission.
         *     id: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "alternateLink": "my_alternateLink",
         *   //   "assignedGrade": {},
         *   //   "assignmentSubmission": {},
         *   //   "associatedWithDeveloper": false,
         *   //   "courseId": "my_courseId",
         *   //   "courseWorkId": "my_courseWorkId",
         *   //   "courseWorkType": "my_courseWorkType",
         *   //   "creationTime": "my_creationTime",
         *   //   "draftGrade": {},
         *   //   "id": "my_id",
         *   //   "late": false,
         *   //   "multipleChoiceSubmission": {},
         *   //   "shortAnswerSubmission": {},
         *   //   "state": "my_state",
         *   //   "submissionHistory": [],
         *   //   "updateTime": "my_updateTime",
         *   //   "userId": "my_userId"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.courses.courseWork.studentSubmissions.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         * @param {string} params.courseWorkId Identifier of the course work.
         * @param {string} params.id Identifier of the student submission.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Courses$Coursework$Studentsubmissions$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Courses$Coursework$Studentsubmissions$Get, options?: MethodOptions): GaxiosPromise<Schema$StudentSubmission>;
        get(params: Params$Resource$Courses$Coursework$Studentsubmissions$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Courses$Coursework$Studentsubmissions$Get, options: MethodOptions | BodyResponseCallback<Schema$StudentSubmission>, callback: BodyResponseCallback<Schema$StudentSubmission>): void;
        get(params: Params$Resource$Courses$Coursework$Studentsubmissions$Get, callback: BodyResponseCallback<Schema$StudentSubmission>): void;
        get(callback: BodyResponseCallback<Schema$StudentSubmission>): void;
        /**
         * classroom.courses.courseWork.studentSubmissions.list
         * @desc Returns a list of student submissions that the requester is permitted to view, factoring in the OAuth scopes of the request. `-` may be specified as the `course_work_id` to include student submissions for multiple course work items.  Course students may only view their own work. Course teachers and domain administrators may view all student submissions.  This method returns the following error codes:  * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or course work, or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course does not exist.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/classroom.coursework.me',
         *       'https://www.googleapis.com/auth/classroom.coursework.me.readonly',
         *       'https://www.googleapis.com/auth/classroom.coursework.students',
         *       'https://www.googleapis.com/auth/classroom.coursework.students.readonly',
         *       'https://www.googleapis.com/auth/classroom.student-submissions.me.readonly',
         *       'https://www.googleapis.com/auth/classroom.student-submissions.students.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.courses.courseWork.studentSubmissions.list({
         *     // Identifier of the course.
         *     // This identifier can be either the Classroom-assigned identifier or an
         *     // alias.
         *     courseId: 'placeholder-value',
         *     // Identifier of the student work to request.
         *     // This may be set to the string literal `"-"` to request student work for
         *     // all course work in the specified course.
         *     courseWorkId: 'placeholder-value',
         *     // Requested lateness value. If specified, returned student submissions are
         *     // restricted by the requested value.
         *     // If unspecified, submissions are returned regardless of `late` value.
         *     late: 'placeholder-value',
         *     // Maximum number of items to return. Zero or unspecified indicates that the
         *     // server may assign a maximum.
         *     //
         *     // The server may return fewer than the specified number of results.
         *     pageSize: 'placeholder-value',
         *     // nextPageToken
         *     // value returned from a previous
         *     // list call,
         *     // indicating that the subsequent page of results should be returned.
         *     //
         *     // The list request
         *     // must be otherwise identical to the one that resulted in this token.
         *     pageToken: 'placeholder-value',
         *     // Requested submission states. If specified, returned student submissions
         *     // match one of the specified submission states.
         *     states: 'placeholder-value',
         *     // Optional argument to restrict returned student work to those owned by the
         *     // student with the specified identifier. The identifier can be one of the
         *     // following:
         *     //
         *     // * the numeric identifier for the user
         *     // * the email address of the user
         *     // * the string literal `"me"`, indicating the requesting user
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "studentSubmissions": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.courses.courseWork.studentSubmissions.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         * @param {string} params.courseWorkId Identifier of the student work to request. This may be set to the string literal `"-"` to request student work for all course work in the specified course.
         * @param {string=} params.late Requested lateness value. If specified, returned student submissions are restricted by the requested value. If unspecified, submissions are returned regardless of `late` value.
         * @param {integer=} params.pageSize Maximum number of items to return. Zero or unspecified indicates that the server may assign a maximum.  The server may return fewer than the specified number of results.
         * @param {string=} params.pageToken nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned.  The list request must be otherwise identical to the one that resulted in this token.
         * @param {string=} params.states Requested submission states. If specified, returned student submissions match one of the specified submission states.
         * @param {string=} params.userId Optional argument to restrict returned student work to those owned by the student with the specified identifier. The identifier can be one of the following:  * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Courses$Coursework$Studentsubmissions$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Courses$Coursework$Studentsubmissions$List, options?: MethodOptions): GaxiosPromise<Schema$ListStudentSubmissionsResponse>;
        list(params: Params$Resource$Courses$Coursework$Studentsubmissions$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Courses$Coursework$Studentsubmissions$List, options: MethodOptions | BodyResponseCallback<Schema$ListStudentSubmissionsResponse>, callback: BodyResponseCallback<Schema$ListStudentSubmissionsResponse>): void;
        list(params: Params$Resource$Courses$Coursework$Studentsubmissions$List, callback: BodyResponseCallback<Schema$ListStudentSubmissionsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListStudentSubmissionsResponse>): void;
        /**
         * classroom.courses.courseWork.studentSubmissions.modifyAttachments
         * @desc Modifies attachments of student submission.  Attachments may only be added to student submissions belonging to course work objects with a `workType` of `ASSIGNMENT`.  This request must be made by the Developer Console project of the [OAuth client ID](https://support.google.com/cloud/answer/6158849) used to create the corresponding course work item.  This method returns the following error codes:  * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or course work, if the user is not permitted to modify attachments on the requested student submission, or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course, course work, or student submission does not exist.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/classroom.coursework.me',
         *       'https://www.googleapis.com/auth/classroom.coursework.students',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.courses.courseWork.studentSubmissions.modifyAttachments(
         *     {
         *       // Identifier of the course.
         *       // This identifier can be either the Classroom-assigned identifier or an
         *       // alias.
         *       courseId: 'placeholder-value',
         *       // Identifier of the course work.
         *       courseWorkId: 'placeholder-value',
         *       // Identifier of the student submission.
         *       id: 'placeholder-value',
         *
         *       // Request body metadata
         *       requestBody: {
         *         // request body parameters
         *         // {
         *         //   "addAttachments": []
         *         // }
         *       },
         *     }
         *   );
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "alternateLink": "my_alternateLink",
         *   //   "assignedGrade": {},
         *   //   "assignmentSubmission": {},
         *   //   "associatedWithDeveloper": false,
         *   //   "courseId": "my_courseId",
         *   //   "courseWorkId": "my_courseWorkId",
         *   //   "courseWorkType": "my_courseWorkType",
         *   //   "creationTime": "my_creationTime",
         *   //   "draftGrade": {},
         *   //   "id": "my_id",
         *   //   "late": false,
         *   //   "multipleChoiceSubmission": {},
         *   //   "shortAnswerSubmission": {},
         *   //   "state": "my_state",
         *   //   "submissionHistory": [],
         *   //   "updateTime": "my_updateTime",
         *   //   "userId": "my_userId"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.courses.courseWork.studentSubmissions.modifyAttachments
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         * @param {string} params.courseWorkId Identifier of the course work.
         * @param {string} params.id Identifier of the student submission.
         * @param {().ModifyAttachmentsRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        modifyAttachments(params: Params$Resource$Courses$Coursework$Studentsubmissions$Modifyattachments, options: StreamMethodOptions): GaxiosPromise<Readable>;
        modifyAttachments(params?: Params$Resource$Courses$Coursework$Studentsubmissions$Modifyattachments, options?: MethodOptions): GaxiosPromise<Schema$StudentSubmission>;
        modifyAttachments(params: Params$Resource$Courses$Coursework$Studentsubmissions$Modifyattachments, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        modifyAttachments(params: Params$Resource$Courses$Coursework$Studentsubmissions$Modifyattachments, options: MethodOptions | BodyResponseCallback<Schema$StudentSubmission>, callback: BodyResponseCallback<Schema$StudentSubmission>): void;
        modifyAttachments(params: Params$Resource$Courses$Coursework$Studentsubmissions$Modifyattachments, callback: BodyResponseCallback<Schema$StudentSubmission>): void;
        modifyAttachments(callback: BodyResponseCallback<Schema$StudentSubmission>): void;
        /**
         * classroom.courses.courseWork.studentSubmissions.patch
         * @desc Updates one or more fields of a student submission.  See google.classroom.v1.StudentSubmission for details of which fields may be updated and who may change them.  This request must be made by the Developer Console project of the [OAuth client ID](https://support.google.com/cloud/answer/6158849) used to create the corresponding course work item.  This method returns the following error codes:  * `PERMISSION_DENIED` if the requesting developer project did not create the corresponding course work, if the user is not permitted to make the requested modification to the student submission, or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course, course work, or student submission does not exist.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/classroom.coursework.me',
         *       'https://www.googleapis.com/auth/classroom.coursework.students',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.courses.courseWork.studentSubmissions.patch({
         *     // Identifier of the course.
         *     // This identifier can be either the Classroom-assigned identifier or an
         *     // alias.
         *     courseId: 'placeholder-value',
         *     // Identifier of the course work.
         *     courseWorkId: 'placeholder-value',
         *     // Identifier of the student submission.
         *     id: 'placeholder-value',
         *     // Mask that identifies which fields on the student submission to update.
         *     // This field is required to do an update. The update fails if invalid
         *     // fields are specified.
         *     //
         *     // The following fields may be specified by teachers:
         *     //
         *     // * `draft_grade`
         *     // * `assigned_grade`
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "alternateLink": "my_alternateLink",
         *       //   "assignedGrade": {},
         *       //   "assignmentSubmission": {},
         *       //   "associatedWithDeveloper": false,
         *       //   "courseId": "my_courseId",
         *       //   "courseWorkId": "my_courseWorkId",
         *       //   "courseWorkType": "my_courseWorkType",
         *       //   "creationTime": "my_creationTime",
         *       //   "draftGrade": {},
         *       //   "id": "my_id",
         *       //   "late": false,
         *       //   "multipleChoiceSubmission": {},
         *       //   "shortAnswerSubmission": {},
         *       //   "state": "my_state",
         *       //   "submissionHistory": [],
         *       //   "updateTime": "my_updateTime",
         *       //   "userId": "my_userId"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "alternateLink": "my_alternateLink",
         *   //   "assignedGrade": {},
         *   //   "assignmentSubmission": {},
         *   //   "associatedWithDeveloper": false,
         *   //   "courseId": "my_courseId",
         *   //   "courseWorkId": "my_courseWorkId",
         *   //   "courseWorkType": "my_courseWorkType",
         *   //   "creationTime": "my_creationTime",
         *   //   "draftGrade": {},
         *   //   "id": "my_id",
         *   //   "late": false,
         *   //   "multipleChoiceSubmission": {},
         *   //   "shortAnswerSubmission": {},
         *   //   "state": "my_state",
         *   //   "submissionHistory": [],
         *   //   "updateTime": "my_updateTime",
         *   //   "userId": "my_userId"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.courses.courseWork.studentSubmissions.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         * @param {string} params.courseWorkId Identifier of the course work.
         * @param {string} params.id Identifier of the student submission.
         * @param {string=} params.updateMask Mask that identifies which fields on the student submission to update. This field is required to do an update. The update fails if invalid fields are specified.  The following fields may be specified by teachers:  * `draft_grade` * `assigned_grade`
         * @param {().StudentSubmission} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Courses$Coursework$Studentsubmissions$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Courses$Coursework$Studentsubmissions$Patch, options?: MethodOptions): GaxiosPromise<Schema$StudentSubmission>;
        patch(params: Params$Resource$Courses$Coursework$Studentsubmissions$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Courses$Coursework$Studentsubmissions$Patch, options: MethodOptions | BodyResponseCallback<Schema$StudentSubmission>, callback: BodyResponseCallback<Schema$StudentSubmission>): void;
        patch(params: Params$Resource$Courses$Coursework$Studentsubmissions$Patch, callback: BodyResponseCallback<Schema$StudentSubmission>): void;
        patch(callback: BodyResponseCallback<Schema$StudentSubmission>): void;
        /**
         * classroom.courses.courseWork.studentSubmissions.reclaim
         * @desc Reclaims a student submission on behalf of the student that owns it.  Reclaiming a student submission transfers ownership of attached Drive files to the student and updates the submission state.  Only the student that owns the requested student submission may call this method, and only for a student submission that has been turned in.  This request must be made by the Developer Console project of the [OAuth client ID](https://support.google.com/cloud/answer/6158849) used to create the corresponding course work item.  This method returns the following error codes:  * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or course work, unsubmit the requested student submission, or for access errors. * `FAILED_PRECONDITION` if the student submission has not been turned in. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course, course work, or student submission does not exist.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/classroom.coursework.me'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.courses.courseWork.studentSubmissions.reclaim({
         *     // Identifier of the course.
         *     // This identifier can be either the Classroom-assigned identifier or an
         *     // alias.
         *     courseId: 'placeholder-value',
         *     // Identifier of the course work.
         *     courseWorkId: 'placeholder-value',
         *     // Identifier of the student submission.
         *     id: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {}
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {}
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.courses.courseWork.studentSubmissions.reclaim
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         * @param {string} params.courseWorkId Identifier of the course work.
         * @param {string} params.id Identifier of the student submission.
         * @param {().ReclaimStudentSubmissionRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        reclaim(params: Params$Resource$Courses$Coursework$Studentsubmissions$Reclaim, options: StreamMethodOptions): GaxiosPromise<Readable>;
        reclaim(params?: Params$Resource$Courses$Coursework$Studentsubmissions$Reclaim, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        reclaim(params: Params$Resource$Courses$Coursework$Studentsubmissions$Reclaim, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        reclaim(params: Params$Resource$Courses$Coursework$Studentsubmissions$Reclaim, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        reclaim(params: Params$Resource$Courses$Coursework$Studentsubmissions$Reclaim, callback: BodyResponseCallback<Schema$Empty>): void;
        reclaim(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * classroom.courses.courseWork.studentSubmissions.return
         * @desc Returns a student submission.  Returning a student submission transfers ownership of attached Drive files to the student and may also update the submission state. Unlike the Classroom application, returning a student submission does not set assignedGrade to the draftGrade value.  Only a teacher of the course that contains the requested student submission may call this method.  This request must be made by the Developer Console project of the [OAuth client ID](https://support.google.com/cloud/answer/6158849) used to create the corresponding course work item.  This method returns the following error codes:  * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or course work, return the requested student submission, or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course, course work, or student submission does not exist.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/classroom.coursework.students'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.courses.courseWork.studentSubmissions.return({
         *     // Identifier of the course.
         *     // This identifier can be either the Classroom-assigned identifier or an
         *     // alias.
         *     courseId: 'placeholder-value',
         *     // Identifier of the course work.
         *     courseWorkId: 'placeholder-value',
         *     // Identifier of the student submission.
         *     id: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {}
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {}
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.courses.courseWork.studentSubmissions.return
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         * @param {string} params.courseWorkId Identifier of the course work.
         * @param {string} params.id Identifier of the student submission.
         * @param {().ReturnStudentSubmissionRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        return(params: Params$Resource$Courses$Coursework$Studentsubmissions$Return, options: StreamMethodOptions): GaxiosPromise<Readable>;
        return(params?: Params$Resource$Courses$Coursework$Studentsubmissions$Return, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        return(params: Params$Resource$Courses$Coursework$Studentsubmissions$Return, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        return(params: Params$Resource$Courses$Coursework$Studentsubmissions$Return, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        return(params: Params$Resource$Courses$Coursework$Studentsubmissions$Return, callback: BodyResponseCallback<Schema$Empty>): void;
        return(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * classroom.courses.courseWork.studentSubmissions.turnIn
         * @desc Turns in a student submission.  Turning in a student submission transfers ownership of attached Drive files to the teacher and may also update the submission state.  This may only be called by the student that owns the specified student submission.  This request must be made by the Developer Console project of the [OAuth client ID](https://support.google.com/cloud/answer/6158849) used to create the corresponding course work item.  This method returns the following error codes:  * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or course work, turn in the requested student submission, or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course, course work, or student submission does not exist.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/classroom.coursework.me'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.courses.courseWork.studentSubmissions.turnIn({
         *     // Identifier of the course.
         *     // This identifier can be either the Classroom-assigned identifier or an
         *     // alias.
         *     courseId: 'placeholder-value',
         *     // Identifier of the course work.
         *     courseWorkId: 'placeholder-value',
         *     // Identifier of the student submission.
         *     id: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {}
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {}
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.courses.courseWork.studentSubmissions.turnIn
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         * @param {string} params.courseWorkId Identifier of the course work.
         * @param {string} params.id Identifier of the student submission.
         * @param {().TurnInStudentSubmissionRequest} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        turnIn(params: Params$Resource$Courses$Coursework$Studentsubmissions$Turnin, options: StreamMethodOptions): GaxiosPromise<Readable>;
        turnIn(params?: Params$Resource$Courses$Coursework$Studentsubmissions$Turnin, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        turnIn(params: Params$Resource$Courses$Coursework$Studentsubmissions$Turnin, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        turnIn(params: Params$Resource$Courses$Coursework$Studentsubmissions$Turnin, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        turnIn(params: Params$Resource$Courses$Coursework$Studentsubmissions$Turnin, callback: BodyResponseCallback<Schema$Empty>): void;
        turnIn(callback: BodyResponseCallback<Schema$Empty>): void;
    }
    export interface Params$Resource$Courses$Coursework$Studentsubmissions$Get extends StandardParameters {
        /**
         * Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         */
        courseId?: string;
        /**
         * Identifier of the course work.
         */
        courseWorkId?: string;
        /**
         * Identifier of the student submission.
         */
        id?: string;
    }
    export interface Params$Resource$Courses$Coursework$Studentsubmissions$List extends StandardParameters {
        /**
         * Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         */
        courseId?: string;
        /**
         * Identifier of the student work to request. This may be set to the string literal `"-"` to request student work for all course work in the specified course.
         */
        courseWorkId?: string;
        /**
         * Requested lateness value. If specified, returned student submissions are restricted by the requested value. If unspecified, submissions are returned regardless of `late` value.
         */
        late?: string;
        /**
         * Maximum number of items to return. Zero or unspecified indicates that the server may assign a maximum.  The server may return fewer than the specified number of results.
         */
        pageSize?: number;
        /**
         * nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned.  The list request must be otherwise identical to the one that resulted in this token.
         */
        pageToken?: string;
        /**
         * Requested submission states. If specified, returned student submissions match one of the specified submission states.
         */
        states?: string[];
        /**
         * Optional argument to restrict returned student work to those owned by the student with the specified identifier. The identifier can be one of the following:  * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user
         */
        userId?: string;
    }
    export interface Params$Resource$Courses$Coursework$Studentsubmissions$Modifyattachments extends StandardParameters {
        /**
         * Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         */
        courseId?: string;
        /**
         * Identifier of the course work.
         */
        courseWorkId?: string;
        /**
         * Identifier of the student submission.
         */
        id?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$ModifyAttachmentsRequest;
    }
    export interface Params$Resource$Courses$Coursework$Studentsubmissions$Patch extends StandardParameters {
        /**
         * Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         */
        courseId?: string;
        /**
         * Identifier of the course work.
         */
        courseWorkId?: string;
        /**
         * Identifier of the student submission.
         */
        id?: string;
        /**
         * Mask that identifies which fields on the student submission to update. This field is required to do an update. The update fails if invalid fields are specified.  The following fields may be specified by teachers:  * `draft_grade` * `assigned_grade`
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$StudentSubmission;
    }
    export interface Params$Resource$Courses$Coursework$Studentsubmissions$Reclaim extends StandardParameters {
        /**
         * Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         */
        courseId?: string;
        /**
         * Identifier of the course work.
         */
        courseWorkId?: string;
        /**
         * Identifier of the student submission.
         */
        id?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$ReclaimStudentSubmissionRequest;
    }
    export interface Params$Resource$Courses$Coursework$Studentsubmissions$Return extends StandardParameters {
        /**
         * Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         */
        courseId?: string;
        /**
         * Identifier of the course work.
         */
        courseWorkId?: string;
        /**
         * Identifier of the student submission.
         */
        id?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$ReturnStudentSubmissionRequest;
    }
    export interface Params$Resource$Courses$Coursework$Studentsubmissions$Turnin extends StandardParameters {
        /**
         * Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         */
        courseId?: string;
        /**
         * Identifier of the course work.
         */
        courseWorkId?: string;
        /**
         * Identifier of the student submission.
         */
        id?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$TurnInStudentSubmissionRequest;
    }
    export class Resource$Courses$Students {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * classroom.courses.students.create
         * @desc Adds a user as a student of a course.  This method returns the following error codes:  * `PERMISSION_DENIED` if the requesting user is not permitted to create students in this course or for access errors. * `NOT_FOUND` if the requested course ID does not exist. * `FAILED_PRECONDITION` if the requested user's account is disabled, for the following request errors:     * CourseMemberLimitReached     * CourseNotModifiable     * UserGroupsMembershipLimitReached * `ALREADY_EXISTS` if the user is already a student or teacher in the course.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/classroom.profile.emails',
         *       'https://www.googleapis.com/auth/classroom.profile.photos',
         *       'https://www.googleapis.com/auth/classroom.rosters',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.courses.students.create({
         *     // Identifier of the course to create the student in.
         *     // This identifier can be either the Classroom-assigned identifier or an
         *     // alias.
         *     courseId: 'placeholder-value',
         *     // Enrollment code of the course to create the student in.
         *     // This code is required if userId
         *     // corresponds to the requesting user; it may be omitted if the requesting
         *     // user has administrative permissions to create students for any user.
         *     enrollmentCode: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "courseId": "my_courseId",
         *       //   "profile": {},
         *       //   "studentWorkFolder": {},
         *       //   "userId": "my_userId"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "courseId": "my_courseId",
         *   //   "profile": {},
         *   //   "studentWorkFolder": {},
         *   //   "userId": "my_userId"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.courses.students.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.courseId Identifier of the course to create the student in. This identifier can be either the Classroom-assigned identifier or an alias.
         * @param {string=} params.enrollmentCode Enrollment code of the course to create the student in. This code is required if userId corresponds to the requesting user; it may be omitted if the requesting user has administrative permissions to create students for any user.
         * @param {().Student} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Courses$Students$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Courses$Students$Create, options?: MethodOptions): GaxiosPromise<Schema$Student>;
        create(params: Params$Resource$Courses$Students$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Courses$Students$Create, options: MethodOptions | BodyResponseCallback<Schema$Student>, callback: BodyResponseCallback<Schema$Student>): void;
        create(params: Params$Resource$Courses$Students$Create, callback: BodyResponseCallback<Schema$Student>): void;
        create(callback: BodyResponseCallback<Schema$Student>): void;
        /**
         * classroom.courses.students.delete
         * @desc Deletes a student of a course.  This method returns the following error codes:  * `PERMISSION_DENIED` if the requesting user is not permitted to delete students of this course or for access errors. * `NOT_FOUND` if no student of this course has the requested ID or if the course does not exist.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/classroom.rosters'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.courses.students.delete({
         *     // Identifier of the course.
         *     // This identifier can be either the Classroom-assigned identifier or an
         *     // alias.
         *     courseId: 'placeholder-value',
         *     // Identifier of the student to delete. The identifier can be one of the
         *     // following:
         *     //
         *     // * the numeric identifier for the user
         *     // * the email address of the user
         *     // * the string literal `"me"`, indicating the requesting user
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {}
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.courses.students.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         * @param {string} params.userId Identifier of the student to delete. The identifier can be one of the following:  * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Courses$Students$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Courses$Students$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Courses$Students$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Courses$Students$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Courses$Students$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * classroom.courses.students.get
         * @desc Returns a student of a course.  This method returns the following error codes:  * `PERMISSION_DENIED` if the requesting user is not permitted to view students of this course or for access errors. * `NOT_FOUND` if no student of this course has the requested ID or if the course does not exist.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/classroom.profile.emails',
         *       'https://www.googleapis.com/auth/classroom.profile.photos',
         *       'https://www.googleapis.com/auth/classroom.rosters',
         *       'https://www.googleapis.com/auth/classroom.rosters.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.courses.students.get({
         *     // Identifier of the course.
         *     // This identifier can be either the Classroom-assigned identifier or an
         *     // alias.
         *     courseId: 'placeholder-value',
         *     // Identifier of the student to return. The identifier can be one of the
         *     // following:
         *     //
         *     // * the numeric identifier for the user
         *     // * the email address of the user
         *     // * the string literal `"me"`, indicating the requesting user
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "courseId": "my_courseId",
         *   //   "profile": {},
         *   //   "studentWorkFolder": {},
         *   //   "userId": "my_userId"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.courses.students.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         * @param {string} params.userId Identifier of the student to return. The identifier can be one of the following:  * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Courses$Students$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Courses$Students$Get, options?: MethodOptions): GaxiosPromise<Schema$Student>;
        get(params: Params$Resource$Courses$Students$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Courses$Students$Get, options: MethodOptions | BodyResponseCallback<Schema$Student>, callback: BodyResponseCallback<Schema$Student>): void;
        get(params: Params$Resource$Courses$Students$Get, callback: BodyResponseCallback<Schema$Student>): void;
        get(callback: BodyResponseCallback<Schema$Student>): void;
        /**
         * classroom.courses.students.list
         * @desc Returns a list of students of this course that the requester is permitted to view.  This method returns the following error codes:  * `NOT_FOUND` if the course does not exist. * `PERMISSION_DENIED` for access errors.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/classroom.profile.emails',
         *       'https://www.googleapis.com/auth/classroom.profile.photos',
         *       'https://www.googleapis.com/auth/classroom.rosters',
         *       'https://www.googleapis.com/auth/classroom.rosters.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.courses.students.list({
         *     // Identifier of the course.
         *     // This identifier can be either the Classroom-assigned identifier or an
         *     // alias.
         *     courseId: 'placeholder-value',
         *     // Maximum number of items to return. Zero means no maximum.
         *     //
         *     // The server may return fewer than the specified number of results.
         *     pageSize: 'placeholder-value',
         *     // nextPageToken
         *     // value returned from a previous
         *     // list call, indicating that
         *     // the subsequent page of results should be returned.
         *     //
         *     // The list request must be
         *     // otherwise identical to the one that resulted in this token.
         *     pageToken: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "students": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.courses.students.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         * @param {integer=} params.pageSize Maximum number of items to return. Zero means no maximum.  The server may return fewer than the specified number of results.
         * @param {string=} params.pageToken nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned.  The list request must be otherwise identical to the one that resulted in this token.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Courses$Students$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Courses$Students$List, options?: MethodOptions): GaxiosPromise<Schema$ListStudentsResponse>;
        list(params: Params$Resource$Courses$Students$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Courses$Students$List, options: MethodOptions | BodyResponseCallback<Schema$ListStudentsResponse>, callback: BodyResponseCallback<Schema$ListStudentsResponse>): void;
        list(params: Params$Resource$Courses$Students$List, callback: BodyResponseCallback<Schema$ListStudentsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListStudentsResponse>): void;
    }
    export interface Params$Resource$Courses$Students$Create extends StandardParameters {
        /**
         * Identifier of the course to create the student in. This identifier can be either the Classroom-assigned identifier or an alias.
         */
        courseId?: string;
        /**
         * Enrollment code of the course to create the student in. This code is required if userId corresponds to the requesting user; it may be omitted if the requesting user has administrative permissions to create students for any user.
         */
        enrollmentCode?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Student;
    }
    export interface Params$Resource$Courses$Students$Delete extends StandardParameters {
        /**
         * Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         */
        courseId?: string;
        /**
         * Identifier of the student to delete. The identifier can be one of the following:  * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user
         */
        userId?: string;
    }
    export interface Params$Resource$Courses$Students$Get extends StandardParameters {
        /**
         * Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         */
        courseId?: string;
        /**
         * Identifier of the student to return. The identifier can be one of the following:  * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user
         */
        userId?: string;
    }
    export interface Params$Resource$Courses$Students$List extends StandardParameters {
        /**
         * Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         */
        courseId?: string;
        /**
         * Maximum number of items to return. Zero means no maximum.  The server may return fewer than the specified number of results.
         */
        pageSize?: number;
        /**
         * nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned.  The list request must be otherwise identical to the one that resulted in this token.
         */
        pageToken?: string;
    }
    export class Resource$Courses$Teachers {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * classroom.courses.teachers.create
         * @desc Creates a teacher of a course.  This method returns the following error codes:  * `PERMISSION_DENIED` if the requesting user is not  permitted to create teachers in this course or for access errors. * `NOT_FOUND` if the requested course ID does not exist. * `FAILED_PRECONDITION` if the requested user's account is disabled, for the following request errors:     * CourseMemberLimitReached     * CourseNotModifiable     * CourseTeacherLimitReached     * UserGroupsMembershipLimitReached * `ALREADY_EXISTS` if the user is already a teacher or student in the course.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/classroom.profile.emails',
         *       'https://www.googleapis.com/auth/classroom.profile.photos',
         *       'https://www.googleapis.com/auth/classroom.rosters',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.courses.teachers.create({
         *     // Identifier of the course.
         *     // This identifier can be either the Classroom-assigned identifier or an
         *     // alias.
         *     courseId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "courseId": "my_courseId",
         *       //   "profile": {},
         *       //   "userId": "my_userId"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "courseId": "my_courseId",
         *   //   "profile": {},
         *   //   "userId": "my_userId"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.courses.teachers.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         * @param {().Teacher} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Courses$Teachers$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Courses$Teachers$Create, options?: MethodOptions): GaxiosPromise<Schema$Teacher>;
        create(params: Params$Resource$Courses$Teachers$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Courses$Teachers$Create, options: MethodOptions | BodyResponseCallback<Schema$Teacher>, callback: BodyResponseCallback<Schema$Teacher>): void;
        create(params: Params$Resource$Courses$Teachers$Create, callback: BodyResponseCallback<Schema$Teacher>): void;
        create(callback: BodyResponseCallback<Schema$Teacher>): void;
        /**
         * classroom.courses.teachers.delete
         * @desc Deletes a teacher of a course.  This method returns the following error codes:  * `PERMISSION_DENIED` if the requesting user is not permitted to delete teachers of this course or for access errors. * `NOT_FOUND` if no teacher of this course has the requested ID or if the course does not exist. * `FAILED_PRECONDITION` if the requested ID belongs to the primary teacher of this course.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/classroom.rosters'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.courses.teachers.delete({
         *     // Identifier of the course.
         *     // This identifier can be either the Classroom-assigned identifier or an
         *     // alias.
         *     courseId: 'placeholder-value',
         *     // Identifier of the teacher to delete. The identifier can be one of the
         *     // following:
         *     //
         *     // * the numeric identifier for the user
         *     // * the email address of the user
         *     // * the string literal `"me"`, indicating the requesting user
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {}
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.courses.teachers.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         * @param {string} params.userId Identifier of the teacher to delete. The identifier can be one of the following:  * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Courses$Teachers$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Courses$Teachers$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Courses$Teachers$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Courses$Teachers$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Courses$Teachers$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * classroom.courses.teachers.get
         * @desc Returns a teacher of a course.  This method returns the following error codes:  * `PERMISSION_DENIED` if the requesting user is not permitted to view teachers of this course or for access errors. * `NOT_FOUND` if no teacher of this course has the requested ID or if the course does not exist.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/classroom.profile.emails',
         *       'https://www.googleapis.com/auth/classroom.profile.photos',
         *       'https://www.googleapis.com/auth/classroom.rosters',
         *       'https://www.googleapis.com/auth/classroom.rosters.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.courses.teachers.get({
         *     // Identifier of the course.
         *     // This identifier can be either the Classroom-assigned identifier or an
         *     // alias.
         *     courseId: 'placeholder-value',
         *     // Identifier of the teacher to return. The identifier can be one of the
         *     // following:
         *     //
         *     // * the numeric identifier for the user
         *     // * the email address of the user
         *     // * the string literal `"me"`, indicating the requesting user
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "courseId": "my_courseId",
         *   //   "profile": {},
         *   //   "userId": "my_userId"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.courses.teachers.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         * @param {string} params.userId Identifier of the teacher to return. The identifier can be one of the following:  * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Courses$Teachers$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Courses$Teachers$Get, options?: MethodOptions): GaxiosPromise<Schema$Teacher>;
        get(params: Params$Resource$Courses$Teachers$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Courses$Teachers$Get, options: MethodOptions | BodyResponseCallback<Schema$Teacher>, callback: BodyResponseCallback<Schema$Teacher>): void;
        get(params: Params$Resource$Courses$Teachers$Get, callback: BodyResponseCallback<Schema$Teacher>): void;
        get(callback: BodyResponseCallback<Schema$Teacher>): void;
        /**
         * classroom.courses.teachers.list
         * @desc Returns a list of teachers of this course that the requester is permitted to view.  This method returns the following error codes:  * `NOT_FOUND` if the course does not exist. * `PERMISSION_DENIED` for access errors.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/classroom.profile.emails',
         *       'https://www.googleapis.com/auth/classroom.profile.photos',
         *       'https://www.googleapis.com/auth/classroom.rosters',
         *       'https://www.googleapis.com/auth/classroom.rosters.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.courses.teachers.list({
         *     // Identifier of the course.
         *     // This identifier can be either the Classroom-assigned identifier or an
         *     // alias.
         *     courseId: 'placeholder-value',
         *     // Maximum number of items to return. Zero means no maximum.
         *     //
         *     // The server may return fewer than the specified number of results.
         *     pageSize: 'placeholder-value',
         *     // nextPageToken
         *     // value returned from a previous
         *     // list call, indicating that
         *     // the subsequent page of results should be returned.
         *     //
         *     // The list request must be
         *     // otherwise identical to the one that resulted in this token.
         *     pageToken: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "teachers": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.courses.teachers.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         * @param {integer=} params.pageSize Maximum number of items to return. Zero means no maximum.  The server may return fewer than the specified number of results.
         * @param {string=} params.pageToken nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned.  The list request must be otherwise identical to the one that resulted in this token.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Courses$Teachers$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Courses$Teachers$List, options?: MethodOptions): GaxiosPromise<Schema$ListTeachersResponse>;
        list(params: Params$Resource$Courses$Teachers$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Courses$Teachers$List, options: MethodOptions | BodyResponseCallback<Schema$ListTeachersResponse>, callback: BodyResponseCallback<Schema$ListTeachersResponse>): void;
        list(params: Params$Resource$Courses$Teachers$List, callback: BodyResponseCallback<Schema$ListTeachersResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListTeachersResponse>): void;
    }
    export interface Params$Resource$Courses$Teachers$Create extends StandardParameters {
        /**
         * Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         */
        courseId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Teacher;
    }
    export interface Params$Resource$Courses$Teachers$Delete extends StandardParameters {
        /**
         * Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         */
        courseId?: string;
        /**
         * Identifier of the teacher to delete. The identifier can be one of the following:  * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user
         */
        userId?: string;
    }
    export interface Params$Resource$Courses$Teachers$Get extends StandardParameters {
        /**
         * Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         */
        courseId?: string;
        /**
         * Identifier of the teacher to return. The identifier can be one of the following:  * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user
         */
        userId?: string;
    }
    export interface Params$Resource$Courses$Teachers$List extends StandardParameters {
        /**
         * Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         */
        courseId?: string;
        /**
         * Maximum number of items to return. Zero means no maximum.  The server may return fewer than the specified number of results.
         */
        pageSize?: number;
        /**
         * nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned.  The list request must be otherwise identical to the one that resulted in this token.
         */
        pageToken?: string;
    }
    export class Resource$Courses$Topics {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * classroom.courses.topics.create
         * @desc Creates a topic.  This method returns the following error codes:  * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course, create a topic in the requested course, or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course does not exist.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/classroom.topics'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.courses.topics.create({
         *     // Identifier of the course.
         *     // This identifier can be either the Classroom-assigned identifier or an
         *     // alias.
         *     courseId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "courseId": "my_courseId",
         *       //   "name": "my_name",
         *       //   "topicId": "my_topicId",
         *       //   "updateTime": "my_updateTime"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "courseId": "my_courseId",
         *   //   "name": "my_name",
         *   //   "topicId": "my_topicId",
         *   //   "updateTime": "my_updateTime"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.courses.topics.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         * @param {().Topic} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Courses$Topics$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Courses$Topics$Create, options?: MethodOptions): GaxiosPromise<Schema$Topic>;
        create(params: Params$Resource$Courses$Topics$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Courses$Topics$Create, options: MethodOptions | BodyResponseCallback<Schema$Topic>, callback: BodyResponseCallback<Schema$Topic>): void;
        create(params: Params$Resource$Courses$Topics$Create, callback: BodyResponseCallback<Schema$Topic>): void;
        create(callback: BodyResponseCallback<Schema$Topic>): void;
        /**
         * classroom.courses.topics.delete
         * @desc Deletes a topic.  This method returns the following error codes:  * `PERMISSION_DENIED` if the requesting user is not allowed to delete the requested topic or for access errors. * `FAILED_PRECONDITION` if the requested topic has already been deleted. * `NOT_FOUND` if no course or topic exists with the requested ID.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/classroom.topics'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.courses.topics.delete({
         *     // Identifier of the course.
         *     // This identifier can be either the Classroom-assigned identifier or an
         *     // alias.
         *     courseId: 'placeholder-value',
         *     // Identifier of the topic to delete.
         *     id: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {}
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.courses.topics.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         * @param {string} params.id Identifier of the topic to delete.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Courses$Topics$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Courses$Topics$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Courses$Topics$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Courses$Topics$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Courses$Topics$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * classroom.courses.topics.get
         * @desc Returns a topic.  This method returns the following error codes:  * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or topic, or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course or topic does not exist.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/classroom.topics',
         *       'https://www.googleapis.com/auth/classroom.topics.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.courses.topics.get({
         *     // Identifier of the course.
         *     courseId: 'placeholder-value',
         *     // Identifier of the topic.
         *     id: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "courseId": "my_courseId",
         *   //   "name": "my_name",
         *   //   "topicId": "my_topicId",
         *   //   "updateTime": "my_updateTime"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.courses.topics.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.courseId Identifier of the course.
         * @param {string} params.id Identifier of the topic.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Courses$Topics$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Courses$Topics$Get, options?: MethodOptions): GaxiosPromise<Schema$Topic>;
        get(params: Params$Resource$Courses$Topics$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Courses$Topics$Get, options: MethodOptions | BodyResponseCallback<Schema$Topic>, callback: BodyResponseCallback<Schema$Topic>): void;
        get(params: Params$Resource$Courses$Topics$Get, callback: BodyResponseCallback<Schema$Topic>): void;
        get(callback: BodyResponseCallback<Schema$Topic>): void;
        /**
         * classroom.courses.topics.list
         * @desc Returns the list of topics that the requester is permitted to view.  This method returns the following error codes:  * `PERMISSION_DENIED` if the requesting user is not permitted to access the requested course or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course does not exist.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/classroom.topics',
         *       'https://www.googleapis.com/auth/classroom.topics.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.courses.topics.list({
         *     // Identifier of the course.
         *     // This identifier can be either the Classroom-assigned identifier or an
         *     // alias.
         *     courseId: 'placeholder-value',
         *     // Maximum number of items to return. Zero or unspecified indicates that the
         *     // server may assign a maximum.
         *     //
         *     // The server may return fewer than the specified number of results.
         *     pageSize: 'placeholder-value',
         *     // nextPageToken
         *     // value returned from a previous
         *     // list call,
         *     // indicating that the subsequent page of results should be returned.
         *     //
         *     // The list request
         *     // must be otherwise identical to the one that resulted in this token.
         *     pageToken: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "nextPageToken": "my_nextPageToken",
         *   //   "topic": []
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.courses.topics.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         * @param {integer=} params.pageSize Maximum number of items to return. Zero or unspecified indicates that the server may assign a maximum.  The server may return fewer than the specified number of results.
         * @param {string=} params.pageToken nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned.  The list request must be otherwise identical to the one that resulted in this token.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Courses$Topics$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Courses$Topics$List, options?: MethodOptions): GaxiosPromise<Schema$ListTopicResponse>;
        list(params: Params$Resource$Courses$Topics$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Courses$Topics$List, options: MethodOptions | BodyResponseCallback<Schema$ListTopicResponse>, callback: BodyResponseCallback<Schema$ListTopicResponse>): void;
        list(params: Params$Resource$Courses$Topics$List, callback: BodyResponseCallback<Schema$ListTopicResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListTopicResponse>): void;
        /**
         * classroom.courses.topics.patch
         * @desc Updates one or more fields of a topic.  This method returns the following error codes:  * `PERMISSION_DENIED` if the requesting developer project did not create the corresponding topic or for access errors. * `INVALID_ARGUMENT` if the request is malformed. * `NOT_FOUND` if the requested course or topic does not exist
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/classroom.topics'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.courses.topics.patch({
         *     // Identifier of the course.
         *     // This identifier can be either the Classroom-assigned identifier or an
         *     // alias.
         *     courseId: 'placeholder-value',
         *     // Identifier of the topic.
         *     id: 'placeholder-value',
         *     // Mask that identifies which fields on the topic to update.
         *     // This field is required to do an update. The update fails if invalid
         *     // fields are specified. If a field supports empty values, it can be cleared
         *     // by specifying it in the update mask and not in the Topic object. If a
         *     // field that does not support empty values is included in the update mask and
         *     // not set in the Topic object, an `INVALID_ARGUMENT` error is
         *     // returned.
         *     //
         *     // The following fields may be specified:
         *     //
         *     // * `name`
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "courseId": "my_courseId",
         *       //   "name": "my_name",
         *       //   "topicId": "my_topicId",
         *       //   "updateTime": "my_updateTime"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "courseId": "my_courseId",
         *   //   "name": "my_name",
         *   //   "topicId": "my_topicId",
         *   //   "updateTime": "my_updateTime"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.courses.topics.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.courseId Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         * @param {string} params.id Identifier of the topic.
         * @param {string=} params.updateMask Mask that identifies which fields on the topic to update. This field is required to do an update. The update fails if invalid fields are specified. If a field supports empty values, it can be cleared by specifying it in the update mask and not in the Topic object. If a field that does not support empty values is included in the update mask and not set in the Topic object, an `INVALID_ARGUMENT` error is returned.  The following fields may be specified:  * `name`
         * @param {().Topic} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Courses$Topics$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Courses$Topics$Patch, options?: MethodOptions): GaxiosPromise<Schema$Topic>;
        patch(params: Params$Resource$Courses$Topics$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Courses$Topics$Patch, options: MethodOptions | BodyResponseCallback<Schema$Topic>, callback: BodyResponseCallback<Schema$Topic>): void;
        patch(params: Params$Resource$Courses$Topics$Patch, callback: BodyResponseCallback<Schema$Topic>): void;
        patch(callback: BodyResponseCallback<Schema$Topic>): void;
    }
    export interface Params$Resource$Courses$Topics$Create extends StandardParameters {
        /**
         * Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         */
        courseId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Topic;
    }
    export interface Params$Resource$Courses$Topics$Delete extends StandardParameters {
        /**
         * Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         */
        courseId?: string;
        /**
         * Identifier of the topic to delete.
         */
        id?: string;
    }
    export interface Params$Resource$Courses$Topics$Get extends StandardParameters {
        /**
         * Identifier of the course.
         */
        courseId?: string;
        /**
         * Identifier of the topic.
         */
        id?: string;
    }
    export interface Params$Resource$Courses$Topics$List extends StandardParameters {
        /**
         * Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         */
        courseId?: string;
        /**
         * Maximum number of items to return. Zero or unspecified indicates that the server may assign a maximum.  The server may return fewer than the specified number of results.
         */
        pageSize?: number;
        /**
         * nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned.  The list request must be otherwise identical to the one that resulted in this token.
         */
        pageToken?: string;
    }
    export interface Params$Resource$Courses$Topics$Patch extends StandardParameters {
        /**
         * Identifier of the course. This identifier can be either the Classroom-assigned identifier or an alias.
         */
        courseId?: string;
        /**
         * Identifier of the topic.
         */
        id?: string;
        /**
         * Mask that identifies which fields on the topic to update. This field is required to do an update. The update fails if invalid fields are specified. If a field supports empty values, it can be cleared by specifying it in the update mask and not in the Topic object. If a field that does not support empty values is included in the update mask and not set in the Topic object, an `INVALID_ARGUMENT` error is returned.  The following fields may be specified:  * `name`
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$Topic;
    }
    export class Resource$Invitations {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * classroom.invitations.accept
         * @desc Accepts an invitation, removing it and adding the invited user to the teachers or students (as appropriate) of the specified course. Only the invited user may accept an invitation.  This method returns the following error codes:  * `PERMISSION_DENIED` if the requesting user is not permitted to accept the requested invitation or for access errors. * `FAILED_PRECONDITION` for the following request errors:     * CourseMemberLimitReached     * CourseNotModifiable     * CourseTeacherLimitReached     * UserGroupsMembershipLimitReached * `NOT_FOUND` if no invitation exists with the requested ID.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/classroom.rosters'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.invitations.accept({
         *     // Identifier of the invitation to accept.
         *     id: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {}
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.invitations.accept
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.id Identifier of the invitation to accept.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        accept(params: Params$Resource$Invitations$Accept, options: StreamMethodOptions): GaxiosPromise<Readable>;
        accept(params?: Params$Resource$Invitations$Accept, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        accept(params: Params$Resource$Invitations$Accept, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        accept(params: Params$Resource$Invitations$Accept, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        accept(params: Params$Resource$Invitations$Accept, callback: BodyResponseCallback<Schema$Empty>): void;
        accept(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * classroom.invitations.create
         * @desc Creates an invitation. Only one invitation for a user and course may exist at a time. Delete and re-create an invitation to make changes.  This method returns the following error codes:  * `PERMISSION_DENIED` if the requesting user is not permitted to create invitations for this course or for access errors. * `NOT_FOUND` if the course or the user does not exist. * `FAILED_PRECONDITION` if the requested user's account is disabled or if the user already has this role or a role with greater permissions. * `ALREADY_EXISTS` if an invitation for the specified user and course already exists.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/classroom.rosters'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.invitations.create({
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "courseId": "my_courseId",
         *       //   "id": "my_id",
         *       //   "role": "my_role",
         *       //   "userId": "my_userId"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "courseId": "my_courseId",
         *   //   "id": "my_id",
         *   //   "role": "my_role",
         *   //   "userId": "my_userId"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.invitations.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {().Invitation} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Invitations$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Invitations$Create, options?: MethodOptions): GaxiosPromise<Schema$Invitation>;
        create(params: Params$Resource$Invitations$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Invitations$Create, options: MethodOptions | BodyResponseCallback<Schema$Invitation>, callback: BodyResponseCallback<Schema$Invitation>): void;
        create(params: Params$Resource$Invitations$Create, callback: BodyResponseCallback<Schema$Invitation>): void;
        create(callback: BodyResponseCallback<Schema$Invitation>): void;
        /**
         * classroom.invitations.delete
         * @desc Deletes an invitation.  This method returns the following error codes:  * `PERMISSION_DENIED` if the requesting user is not permitted to delete the requested invitation or for access errors. * `NOT_FOUND` if no invitation exists with the requested ID.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/classroom.rosters'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.invitations.delete({
         *     // Identifier of the invitation to delete.
         *     id: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {}
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.invitations.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.id Identifier of the invitation to delete.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Invitations$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Invitations$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Invitations$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Invitations$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Invitations$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * classroom.invitations.get
         * @desc Returns an invitation.  This method returns the following error codes:  * `PERMISSION_DENIED` if the requesting user is not permitted to view the requested invitation or for access errors. * `NOT_FOUND` if no invitation exists with the requested ID.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/classroom.rosters',
         *       'https://www.googleapis.com/auth/classroom.rosters.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.invitations.get({
         *     // Identifier of the invitation to return.
         *     id: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "courseId": "my_courseId",
         *   //   "id": "my_id",
         *   //   "role": "my_role",
         *   //   "userId": "my_userId"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.invitations.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.id Identifier of the invitation to return.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Invitations$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Invitations$Get, options?: MethodOptions): GaxiosPromise<Schema$Invitation>;
        get(params: Params$Resource$Invitations$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Invitations$Get, options: MethodOptions | BodyResponseCallback<Schema$Invitation>, callback: BodyResponseCallback<Schema$Invitation>): void;
        get(params: Params$Resource$Invitations$Get, callback: BodyResponseCallback<Schema$Invitation>): void;
        get(callback: BodyResponseCallback<Schema$Invitation>): void;
        /**
         * classroom.invitations.list
         * @desc Returns a list of invitations that the requesting user is permitted to view, restricted to those that match the list request.  *Note:* At least one of `user_id` or `course_id` must be supplied. Both fields can be supplied.  This method returns the following error codes:  * `PERMISSION_DENIED` for access errors.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/classroom.rosters',
         *       'https://www.googleapis.com/auth/classroom.rosters.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.invitations.list({
         *     // Restricts returned invitations to those for a course with the specified
         *     // identifier.
         *     courseId: 'placeholder-value',
         *     // Maximum number of items to return. Zero means no maximum.
         *     //
         *     // The server may return fewer than the specified number of results.
         *     pageSize: 'placeholder-value',
         *     // nextPageToken
         *     // value returned from a previous
         *     // list call, indicating
         *     // that the subsequent page of results should be returned.
         *     //
         *     // The list request must be
         *     // otherwise identical to the one that resulted in this token.
         *     pageToken: 'placeholder-value',
         *     // Restricts returned invitations to those for a specific user. The identifier
         *     // can be one of the following:
         *     //
         *     // * the numeric identifier for the user
         *     // * the email address of the user
         *     // * the string literal `"me"`, indicating the requesting user
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "invitations": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.invitations.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.courseId Restricts returned invitations to those for a course with the specified identifier.
         * @param {integer=} params.pageSize Maximum number of items to return. Zero means no maximum.  The server may return fewer than the specified number of results.
         * @param {string=} params.pageToken nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned.  The list request must be otherwise identical to the one that resulted in this token.
         * @param {string=} params.userId Restricts returned invitations to those for a specific user. The identifier can be one of the following:  * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Invitations$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Invitations$List, options?: MethodOptions): GaxiosPromise<Schema$ListInvitationsResponse>;
        list(params: Params$Resource$Invitations$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Invitations$List, options: MethodOptions | BodyResponseCallback<Schema$ListInvitationsResponse>, callback: BodyResponseCallback<Schema$ListInvitationsResponse>): void;
        list(params: Params$Resource$Invitations$List, callback: BodyResponseCallback<Schema$ListInvitationsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListInvitationsResponse>): void;
    }
    export interface Params$Resource$Invitations$Accept extends StandardParameters {
        /**
         * Identifier of the invitation to accept.
         */
        id?: string;
    }
    export interface Params$Resource$Invitations$Create extends StandardParameters {
        /**
         * Request body metadata
         */
        requestBody?: Schema$Invitation;
    }
    export interface Params$Resource$Invitations$Delete extends StandardParameters {
        /**
         * Identifier of the invitation to delete.
         */
        id?: string;
    }
    export interface Params$Resource$Invitations$Get extends StandardParameters {
        /**
         * Identifier of the invitation to return.
         */
        id?: string;
    }
    export interface Params$Resource$Invitations$List extends StandardParameters {
        /**
         * Restricts returned invitations to those for a course with the specified identifier.
         */
        courseId?: string;
        /**
         * Maximum number of items to return. Zero means no maximum.  The server may return fewer than the specified number of results.
         */
        pageSize?: number;
        /**
         * nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned.  The list request must be otherwise identical to the one that resulted in this token.
         */
        pageToken?: string;
        /**
         * Restricts returned invitations to those for a specific user. The identifier can be one of the following:  * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user
         */
        userId?: string;
    }
    export class Resource$Registrations {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * classroom.registrations.create
         * @desc Creates a `Registration`, causing Classroom to start sending notifications from the provided `feed` to the destination provided in `cloudPubSubTopic`.  Returns the created `Registration`. Currently, this will be the same as the argument, but with server-assigned fields such as `expiry_time` and `id` filled in.  Note that any value specified for the `expiry_time` or `id` fields will be ignored.  While Classroom may validate the `cloudPubSubTopic` and return errors on a best effort basis, it is the caller's responsibility to ensure that it exists and that Classroom has permission to publish to it.  This method may return the following error codes:  * `PERMISSION_DENIED` if:     * the authenticated user does not have permission to receive       notifications from the requested field; or     * the credential provided does not include the appropriate scope for       the requested feed.     * another access error is encountered. * `INVALID_ARGUMENT` if:     * no `cloudPubsubTopic` is specified, or the specified       `cloudPubsubTopic` is not valid; or     * no `feed` is specified, or the specified `feed` is not valid. * `NOT_FOUND` if:     * the specified `feed` cannot be located, or the requesting user does       not have permission to determine whether or not it exists; or     * the specified `cloudPubsubTopic` cannot be located, or Classroom has       not been granted permission to publish to it.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/classroom.push-notifications'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.registrations.create({
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "cloudPubsubTopic": {},
         *       //   "expiryTime": "my_expiryTime",
         *       //   "feed": {},
         *       //   "registrationId": "my_registrationId"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "cloudPubsubTopic": {},
         *   //   "expiryTime": "my_expiryTime",
         *   //   "feed": {},
         *   //   "registrationId": "my_registrationId"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.registrations.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {().Registration} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Registrations$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Registrations$Create, options?: MethodOptions): GaxiosPromise<Schema$Registration>;
        create(params: Params$Resource$Registrations$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Registrations$Create, options: MethodOptions | BodyResponseCallback<Schema$Registration>, callback: BodyResponseCallback<Schema$Registration>): void;
        create(params: Params$Resource$Registrations$Create, callback: BodyResponseCallback<Schema$Registration>): void;
        create(callback: BodyResponseCallback<Schema$Registration>): void;
        /**
         * classroom.registrations.delete
         * @desc Deletes a `Registration`, causing Classroom to stop sending notifications for that `Registration`.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: ['https://www.googleapis.com/auth/classroom.push-notifications'],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.registrations.delete({
         *     // The `registration_id` of the `Registration` to be deleted.
         *     registrationId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {}
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.registrations.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.registrationId The `registration_id` of the `Registration` to be deleted.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Registrations$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Registrations$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Registrations$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Registrations$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Registrations$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
    }
    export interface Params$Resource$Registrations$Create extends StandardParameters {
        /**
         * Request body metadata
         */
        requestBody?: Schema$Registration;
    }
    export interface Params$Resource$Registrations$Delete extends StandardParameters {
        /**
         * The `registration_id` of the `Registration` to be deleted.
         */
        registrationId?: string;
    }
    export class Resource$Userprofiles {
        context: APIRequestContext;
        guardianInvitations: Resource$Userprofiles$Guardianinvitations;
        guardians: Resource$Userprofiles$Guardians;
        constructor(context: APIRequestContext);
        /**
         * classroom.userProfiles.get
         * @desc Returns a user profile.  This method returns the following error codes:  * `PERMISSION_DENIED` if the requesting user is not permitted to access this user profile, if no profile exists with the requested ID, or for access errors.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/classroom.profile.emails',
         *       'https://www.googleapis.com/auth/classroom.profile.photos',
         *       'https://www.googleapis.com/auth/classroom.rosters',
         *       'https://www.googleapis.com/auth/classroom.rosters.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.userProfiles.get({
         *     // Identifier of the profile to return. The identifier can be one of the
         *     // following:
         *     //
         *     // * the numeric identifier for the user
         *     // * the email address of the user
         *     // * the string literal `"me"`, indicating the requesting user
         *     userId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "emailAddress": "my_emailAddress",
         *   //   "id": "my_id",
         *   //   "name": {},
         *   //   "permissions": [],
         *   //   "photoUrl": "my_photoUrl",
         *   //   "verifiedTeacher": false
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.userProfiles.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.userId Identifier of the profile to return. The identifier can be one of the following:  * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Userprofiles$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Userprofiles$Get, options?: MethodOptions): GaxiosPromise<Schema$UserProfile>;
        get(params: Params$Resource$Userprofiles$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Userprofiles$Get, options: MethodOptions | BodyResponseCallback<Schema$UserProfile>, callback: BodyResponseCallback<Schema$UserProfile>): void;
        get(params: Params$Resource$Userprofiles$Get, callback: BodyResponseCallback<Schema$UserProfile>): void;
        get(callback: BodyResponseCallback<Schema$UserProfile>): void;
    }
    export interface Params$Resource$Userprofiles$Get extends StandardParameters {
        /**
         * Identifier of the profile to return. The identifier can be one of the following:  * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user
         */
        userId?: string;
    }
    export class Resource$Userprofiles$Guardianinvitations {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * classroom.userProfiles.guardianInvitations.create
         * @desc Creates a guardian invitation, and sends an email to the guardian asking them to confirm that they are the student's guardian.  Once the guardian accepts the invitation, their `state` will change to `COMPLETED` and they will start receiving guardian notifications. A `Guardian` resource will also be created to represent the active guardian.  The request object must have the `student_id` and `invited_email_address` fields set. Failing to set these fields, or setting any other fields in the request, will result in an error.  This method returns the following error codes:  * `PERMISSION_DENIED` if the current user does not have permission to   manage guardians, if the guardian in question has already rejected   too many requests for that student, if guardians are not enabled for the   domain in question, or for other access errors. * `RESOURCE_EXHAUSTED` if the student or guardian has exceeded the guardian   link limit. * `INVALID_ARGUMENT` if the guardian email address is not valid (for   example, if it is too long), or if the format of the student ID provided   cannot be recognized (it is not an email address, nor a `user_id` from   this API). This error will also be returned if read-only fields are set,   or if the `state` field is set to to a value other than `PENDING`. * `NOT_FOUND` if the student ID provided is a valid student ID, but   Classroom has no record of that student. * `ALREADY_EXISTS` if there is already a pending guardian invitation for   the student and `invited_email_address` provided, or if the provided   `invited_email_address` matches the Google account of an existing   `Guardian` for this user.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/classroom.guardianlinks.students',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.userProfiles.guardianInvitations.create({
         *     // ID of the student (in standard format)
         *     studentId: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "creationTime": "my_creationTime",
         *       //   "invitationId": "my_invitationId",
         *       //   "invitedEmailAddress": "my_invitedEmailAddress",
         *       //   "state": "my_state",
         *       //   "studentId": "my_studentId"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "creationTime": "my_creationTime",
         *   //   "invitationId": "my_invitationId",
         *   //   "invitedEmailAddress": "my_invitedEmailAddress",
         *   //   "state": "my_state",
         *   //   "studentId": "my_studentId"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.userProfiles.guardianInvitations.create
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.studentId ID of the student (in standard format)
         * @param {().GuardianInvitation} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        create(params: Params$Resource$Userprofiles$Guardianinvitations$Create, options: StreamMethodOptions): GaxiosPromise<Readable>;
        create(params?: Params$Resource$Userprofiles$Guardianinvitations$Create, options?: MethodOptions): GaxiosPromise<Schema$GuardianInvitation>;
        create(params: Params$Resource$Userprofiles$Guardianinvitations$Create, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        create(params: Params$Resource$Userprofiles$Guardianinvitations$Create, options: MethodOptions | BodyResponseCallback<Schema$GuardianInvitation>, callback: BodyResponseCallback<Schema$GuardianInvitation>): void;
        create(params: Params$Resource$Userprofiles$Guardianinvitations$Create, callback: BodyResponseCallback<Schema$GuardianInvitation>): void;
        create(callback: BodyResponseCallback<Schema$GuardianInvitation>): void;
        /**
         * classroom.userProfiles.guardianInvitations.get
         * @desc Returns a specific guardian invitation.  This method returns the following error codes:  * `PERMISSION_DENIED` if the requesting user is not permitted to view   guardian invitations for the student identified by the `student_id`, if   guardians are not enabled for the domain in question, or for other   access errors. * `INVALID_ARGUMENT` if a `student_id` is specified, but its format cannot   be recognized (it is not an email address, nor a `student_id` from the   API, nor the literal string `me`). * `NOT_FOUND` if Classroom cannot find any record of the given student or   `invitation_id`. May also be returned if the student exists, but the   requesting user does not have access to see that student.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/classroom.guardianlinks.students',
         *       'https://www.googleapis.com/auth/classroom.guardianlinks.students.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.userProfiles.guardianInvitations.get({
         *     // The `id` field of the `GuardianInvitation` being requested.
         *     invitationId: 'placeholder-value',
         *     // The ID of the student whose guardian invitation is being requested.
         *     studentId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "creationTime": "my_creationTime",
         *   //   "invitationId": "my_invitationId",
         *   //   "invitedEmailAddress": "my_invitedEmailAddress",
         *   //   "state": "my_state",
         *   //   "studentId": "my_studentId"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.userProfiles.guardianInvitations.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.invitationId The `id` field of the `GuardianInvitation` being requested.
         * @param {string} params.studentId The ID of the student whose guardian invitation is being requested.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Userprofiles$Guardianinvitations$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Userprofiles$Guardianinvitations$Get, options?: MethodOptions): GaxiosPromise<Schema$GuardianInvitation>;
        get(params: Params$Resource$Userprofiles$Guardianinvitations$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Userprofiles$Guardianinvitations$Get, options: MethodOptions | BodyResponseCallback<Schema$GuardianInvitation>, callback: BodyResponseCallback<Schema$GuardianInvitation>): void;
        get(params: Params$Resource$Userprofiles$Guardianinvitations$Get, callback: BodyResponseCallback<Schema$GuardianInvitation>): void;
        get(callback: BodyResponseCallback<Schema$GuardianInvitation>): void;
        /**
         * classroom.userProfiles.guardianInvitations.list
         * @desc Returns a list of guardian invitations that the requesting user is permitted to view, filtered by the parameters provided.  This method returns the following error codes:  * `PERMISSION_DENIED` if a `student_id` is specified, and the requesting   user is not permitted to view guardian invitations for that student, if   `"-"` is specified as the `student_id` and the user is not a domain   administrator, if guardians are not enabled for the domain in question,   or for other access errors. * `INVALID_ARGUMENT` if a `student_id` is specified, but its format cannot   be recognized (it is not an email address, nor a `student_id` from the   API, nor the literal string `me`). May also be returned if an invalid   `page_token` or `state` is provided. * `NOT_FOUND` if a `student_id` is specified, and its format can be   recognized, but Classroom has no record of that student.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/classroom.guardianlinks.students',
         *       'https://www.googleapis.com/auth/classroom.guardianlinks.students.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.userProfiles.guardianInvitations.list({
         *     // If specified, only results with the specified `invited_email_address`
         *     // are returned.
         *     invitedEmailAddress: 'placeholder-value',
         *     // Maximum number of items to return. Zero or unspecified indicates that the
         *     // server may assign a maximum.
         *     //
         *     // The server may return fewer than the specified number of results.
         *     pageSize: 'placeholder-value',
         *     // nextPageToken
         *     // value returned from a previous
         *     // list
         *     // call, indicating that the subsequent page of results should be returned.
         *     //
         *     // The list
         *     // request must be otherwise identical to the one that resulted in this token.
         *     pageToken: 'placeholder-value',
         *     // If specified, only results with the specified `state` values are
         *     // returned. Otherwise, results with a `state` of `PENDING` are returned.
         *     states: 'placeholder-value',
         *     // The ID of the student whose guardian invitations are to be returned.
         *     // The identifier can be one of the following:
         *     //
         *     // * the numeric identifier for the user
         *     // * the email address of the user
         *     // * the string literal `"me"`, indicating the requesting user
         *     // * the string literal `"-"`, indicating that results should be returned for
         *     //   all students that the requesting user is permitted to view guardian
         *     //   invitations.
         *     studentId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "guardianInvitations": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.userProfiles.guardianInvitations.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.invitedEmailAddress If specified, only results with the specified `invited_email_address` are returned.
         * @param {integer=} params.pageSize Maximum number of items to return. Zero or unspecified indicates that the server may assign a maximum.  The server may return fewer than the specified number of results.
         * @param {string=} params.pageToken nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned.  The list request must be otherwise identical to the one that resulted in this token.
         * @param {string=} params.states If specified, only results with the specified `state` values are returned. Otherwise, results with a `state` of `PENDING` are returned.
         * @param {string} params.studentId The ID of the student whose guardian invitations are to be returned. The identifier can be one of the following:  * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user * the string literal `"-"`, indicating that results should be returned for   all students that the requesting user is permitted to view guardian   invitations.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Userprofiles$Guardianinvitations$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Userprofiles$Guardianinvitations$List, options?: MethodOptions): GaxiosPromise<Schema$ListGuardianInvitationsResponse>;
        list(params: Params$Resource$Userprofiles$Guardianinvitations$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Userprofiles$Guardianinvitations$List, options: MethodOptions | BodyResponseCallback<Schema$ListGuardianInvitationsResponse>, callback: BodyResponseCallback<Schema$ListGuardianInvitationsResponse>): void;
        list(params: Params$Resource$Userprofiles$Guardianinvitations$List, callback: BodyResponseCallback<Schema$ListGuardianInvitationsResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListGuardianInvitationsResponse>): void;
        /**
         * classroom.userProfiles.guardianInvitations.patch
         * @desc Modifies a guardian invitation.  Currently, the only valid modification is to change the `state` from `PENDING` to `COMPLETE`. This has the effect of withdrawing the invitation.  This method returns the following error codes:  * `PERMISSION_DENIED` if the current user does not have permission to   manage guardians, if guardians are not enabled for the domain in question   or for other access errors. * `FAILED_PRECONDITION` if the guardian link is not in the `PENDING` state. * `INVALID_ARGUMENT` if the format of the student ID provided   cannot be recognized (it is not an email address, nor a `user_id` from   this API), or if the passed `GuardianInvitation` has a `state` other than   `COMPLETE`, or if it modifies fields other than `state`. * `NOT_FOUND` if the student ID provided is a valid student ID, but   Classroom has no record of that student, or if the `id` field does not   refer to a guardian invitation known to Classroom.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/classroom.guardianlinks.students',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.userProfiles.guardianInvitations.patch({
         *     // The `id` field of the `GuardianInvitation` to be modified.
         *     invitationId: 'placeholder-value',
         *     // The ID of the student whose guardian invitation is to be modified.
         *     studentId: 'placeholder-value',
         *     // Mask that identifies which fields on the course to update.
         *     // This field is required to do an update. The update fails if invalid
         *     // fields are specified. The following fields are valid:
         *     //
         *     // * `state`
         *     //
         *     // When set in a query parameter, this field should be specified as
         *     //
         *     // `updateMask=<field1>,<field2>,...`
         *     updateMask: 'placeholder-value',
         *
         *     // Request body metadata
         *     requestBody: {
         *       // request body parameters
         *       // {
         *       //   "creationTime": "my_creationTime",
         *       //   "invitationId": "my_invitationId",
         *       //   "invitedEmailAddress": "my_invitedEmailAddress",
         *       //   "state": "my_state",
         *       //   "studentId": "my_studentId"
         *       // }
         *     },
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "creationTime": "my_creationTime",
         *   //   "invitationId": "my_invitationId",
         *   //   "invitedEmailAddress": "my_invitedEmailAddress",
         *   //   "state": "my_state",
         *   //   "studentId": "my_studentId"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.userProfiles.guardianInvitations.patch
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.invitationId The `id` field of the `GuardianInvitation` to be modified.
         * @param {string} params.studentId The ID of the student whose guardian invitation is to be modified.
         * @param {string=} params.updateMask Mask that identifies which fields on the course to update. This field is required to do an update. The update fails if invalid fields are specified. The following fields are valid:  * `state`  When set in a query parameter, this field should be specified as  `updateMask=<field1>,<field2>,...`
         * @param {().GuardianInvitation} params.requestBody Request body data
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        patch(params: Params$Resource$Userprofiles$Guardianinvitations$Patch, options: StreamMethodOptions): GaxiosPromise<Readable>;
        patch(params?: Params$Resource$Userprofiles$Guardianinvitations$Patch, options?: MethodOptions): GaxiosPromise<Schema$GuardianInvitation>;
        patch(params: Params$Resource$Userprofiles$Guardianinvitations$Patch, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        patch(params: Params$Resource$Userprofiles$Guardianinvitations$Patch, options: MethodOptions | BodyResponseCallback<Schema$GuardianInvitation>, callback: BodyResponseCallback<Schema$GuardianInvitation>): void;
        patch(params: Params$Resource$Userprofiles$Guardianinvitations$Patch, callback: BodyResponseCallback<Schema$GuardianInvitation>): void;
        patch(callback: BodyResponseCallback<Schema$GuardianInvitation>): void;
    }
    export interface Params$Resource$Userprofiles$Guardianinvitations$Create extends StandardParameters {
        /**
         * ID of the student (in standard format)
         */
        studentId?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$GuardianInvitation;
    }
    export interface Params$Resource$Userprofiles$Guardianinvitations$Get extends StandardParameters {
        /**
         * The `id` field of the `GuardianInvitation` being requested.
         */
        invitationId?: string;
        /**
         * The ID of the student whose guardian invitation is being requested.
         */
        studentId?: string;
    }
    export interface Params$Resource$Userprofiles$Guardianinvitations$List extends StandardParameters {
        /**
         * If specified, only results with the specified `invited_email_address` are returned.
         */
        invitedEmailAddress?: string;
        /**
         * Maximum number of items to return. Zero or unspecified indicates that the server may assign a maximum.  The server may return fewer than the specified number of results.
         */
        pageSize?: number;
        /**
         * nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned.  The list request must be otherwise identical to the one that resulted in this token.
         */
        pageToken?: string;
        /**
         * If specified, only results with the specified `state` values are returned. Otherwise, results with a `state` of `PENDING` are returned.
         */
        states?: string[];
        /**
         * The ID of the student whose guardian invitations are to be returned. The identifier can be one of the following:  * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user * the string literal `"-"`, indicating that results should be returned for   all students that the requesting user is permitted to view guardian   invitations.
         */
        studentId?: string;
    }
    export interface Params$Resource$Userprofiles$Guardianinvitations$Patch extends StandardParameters {
        /**
         * The `id` field of the `GuardianInvitation` to be modified.
         */
        invitationId?: string;
        /**
         * The ID of the student whose guardian invitation is to be modified.
         */
        studentId?: string;
        /**
         * Mask that identifies which fields on the course to update. This field is required to do an update. The update fails if invalid fields are specified. The following fields are valid:  * `state`  When set in a query parameter, this field should be specified as  `updateMask=<field1>,<field2>,...`
         */
        updateMask?: string;
        /**
         * Request body metadata
         */
        requestBody?: Schema$GuardianInvitation;
    }
    export class Resource$Userprofiles$Guardians {
        context: APIRequestContext;
        constructor(context: APIRequestContext);
        /**
         * classroom.userProfiles.guardians.delete
         * @desc Deletes a guardian.  The guardian will no longer receive guardian notifications and the guardian will no longer be accessible via the API.  This method returns the following error codes:  * `PERMISSION_DENIED` if no user that matches the provided `student_id`   is visible to the requesting user, if the requesting user is not   permitted to manage guardians for the student identified by the   `student_id`, if guardians are not enabled for the domain in question,   or for other access errors. * `INVALID_ARGUMENT` if a `student_id` is specified, but its format cannot   be recognized (it is not an email address, nor a `student_id` from the   API). * `NOT_FOUND` if the requesting user is permitted to modify guardians for   the requested `student_id`, but no `Guardian` record exists for that   student with the provided `guardian_id`.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/classroom.guardianlinks.students',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.userProfiles.guardians.delete({
         *     // The `id` field from a `Guardian`.
         *     guardianId: 'placeholder-value',
         *     // The student whose guardian is to be deleted. One of the following:
         *     //
         *     // * the numeric identifier for the user
         *     // * the email address of the user
         *     // * the string literal `"me"`, indicating the requesting user
         *     studentId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {}
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.userProfiles.guardians.delete
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.guardianId The `id` field from a `Guardian`.
         * @param {string} params.studentId The student whose guardian is to be deleted. One of the following:  * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        delete(params: Params$Resource$Userprofiles$Guardians$Delete, options: StreamMethodOptions): GaxiosPromise<Readable>;
        delete(params?: Params$Resource$Userprofiles$Guardians$Delete, options?: MethodOptions): GaxiosPromise<Schema$Empty>;
        delete(params: Params$Resource$Userprofiles$Guardians$Delete, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        delete(params: Params$Resource$Userprofiles$Guardians$Delete, options: MethodOptions | BodyResponseCallback<Schema$Empty>, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(params: Params$Resource$Userprofiles$Guardians$Delete, callback: BodyResponseCallback<Schema$Empty>): void;
        delete(callback: BodyResponseCallback<Schema$Empty>): void;
        /**
         * classroom.userProfiles.guardians.get
         * @desc Returns a specific guardian.  This method returns the following error codes:  * `PERMISSION_DENIED` if no user that matches the provided `student_id`   is visible to the requesting user, if the requesting user is not   permitted to view guardian information for the student identified by the   `student_id`, if guardians are not enabled for the domain in question,   or for other access errors. * `INVALID_ARGUMENT` if a `student_id` is specified, but its format cannot   be recognized (it is not an email address, nor a `student_id` from the   API, nor the literal string `me`). * `NOT_FOUND` if the requesting user is permitted to view guardians for   the requested `student_id`, but no `Guardian` record exists for that   student that matches the provided `guardian_id`.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/classroom.guardianlinks.me.readonly',
         *       'https://www.googleapis.com/auth/classroom.guardianlinks.students',
         *       'https://www.googleapis.com/auth/classroom.guardianlinks.students.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.userProfiles.guardians.get({
         *     // The `id` field from a `Guardian`.
         *     guardianId: 'placeholder-value',
         *     // The student whose guardian is being requested. One of the following:
         *     //
         *     // * the numeric identifier for the user
         *     // * the email address of the user
         *     // * the string literal `"me"`, indicating the requesting user
         *     studentId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "guardianId": "my_guardianId",
         *   //   "guardianProfile": {},
         *   //   "invitedEmailAddress": "my_invitedEmailAddress",
         *   //   "studentId": "my_studentId"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.userProfiles.guardians.get
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string} params.guardianId The `id` field from a `Guardian`.
         * @param {string} params.studentId The student whose guardian is being requested. One of the following:  * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get(params: Params$Resource$Userprofiles$Guardians$Get, options: StreamMethodOptions): GaxiosPromise<Readable>;
        get(params?: Params$Resource$Userprofiles$Guardians$Get, options?: MethodOptions): GaxiosPromise<Schema$Guardian>;
        get(params: Params$Resource$Userprofiles$Guardians$Get, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        get(params: Params$Resource$Userprofiles$Guardians$Get, options: MethodOptions | BodyResponseCallback<Schema$Guardian>, callback: BodyResponseCallback<Schema$Guardian>): void;
        get(params: Params$Resource$Userprofiles$Guardians$Get, callback: BodyResponseCallback<Schema$Guardian>): void;
        get(callback: BodyResponseCallback<Schema$Guardian>): void;
        /**
         * classroom.userProfiles.guardians.list
         * @desc Returns a list of guardians that the requesting user is permitted to view, restricted to those that match the request.  To list guardians for any student that the requesting user may view guardians for, use the literal character `-` for the student ID.  This method returns the following error codes:  * `PERMISSION_DENIED` if a `student_id` is specified, and the requesting   user is not permitted to view guardian information for that student, if   `"-"` is specified as the `student_id` and the user is not a domain   administrator, if guardians are not enabled for the domain in question,   if the `invited_email_address` filter is set by a user who is not a   domain administrator, or for other access errors. * `INVALID_ARGUMENT` if a `student_id` is specified, but its format cannot   be recognized (it is not an email address, nor a `student_id` from the   API, nor the literal string `me`). May also be returned if an invalid   `page_token` is provided. * `NOT_FOUND` if a `student_id` is specified, and its format can be   recognized, but Classroom has no record of that student.
         * @example
         * // Before running the sample:
         * // - Enable the API at:
         * //   https://console.developers.google.com/apis/api/classroom.googleapis.com
         * // - Login into gcloud by running:
         * //   `$ gcloud auth application-default login`
         * // - Install the npm module by running:
         * //   `$ npm install googleapis`
         *
         * const {google} = require('googleapis');
         * const classroom = google.classroom('v1');
         *
         * async function main() {
         *   const auth = new google.auth.GoogleAuth({
         *     // Scopes can be specified either as an array or as a single, space-delimited string.
         *     scopes: [
         *       'https://www.googleapis.com/auth/classroom.guardianlinks.me.readonly',
         *       'https://www.googleapis.com/auth/classroom.guardianlinks.students',
         *       'https://www.googleapis.com/auth/classroom.guardianlinks.students.readonly',
         *     ],
         *   });
         *
         *   // Acquire an auth client, and bind it to all future calls
         *   const authClient = await auth.getClient();
         *   google.options('auth', authClient);
         *
         *   // Do the magic
         *   const res = await classroom.userProfiles.guardians.list({
         *     // Filter results by the email address that the original invitation was sent
         *     // to, resulting in this guardian link.
         *     // This filter can only be used by domain administrators.
         *     invitedEmailAddress: 'placeholder-value',
         *     // Maximum number of items to return. Zero or unspecified indicates that the
         *     // server may assign a maximum.
         *     //
         *     // The server may return fewer than the specified number of results.
         *     pageSize: 'placeholder-value',
         *     // nextPageToken
         *     // value returned from a previous
         *     // list call,
         *     // indicating that the subsequent page of results should be returned.
         *     //
         *     // The list request
         *     // must be otherwise identical to the one that resulted in this token.
         *     pageToken: 'placeholder-value',
         *     // Filter results by the student who the guardian is linked to.
         *     // The identifier can be one of the following:
         *     //
         *     // * the numeric identifier for the user
         *     // * the email address of the user
         *     // * the string literal `"me"`, indicating the requesting user
         *     // * the string literal `"-"`, indicating that results should be returned for
         *     //   all students that the requesting user has access to view.
         *     studentId: 'placeholder-value',
         *   });
         *   console.log(res.data);
         *
         *   // Example response
         *   // {
         *   //   "guardians": [],
         *   //   "nextPageToken": "my_nextPageToken"
         *   // }
         * }
         *
         * main().catch(e => {
         *   console.error(e);
         *   throw e;
         * });
         *
         * @alias classroom.userProfiles.guardians.list
         * @memberOf! ()
         *
         * @param {object} params Parameters for request
         * @param {string=} params.invitedEmailAddress Filter results by the email address that the original invitation was sent to, resulting in this guardian link. This filter can only be used by domain administrators.
         * @param {integer=} params.pageSize Maximum number of items to return. Zero or unspecified indicates that the server may assign a maximum.  The server may return fewer than the specified number of results.
         * @param {string=} params.pageToken nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned.  The list request must be otherwise identical to the one that resulted in this token.
         * @param {string} params.studentId Filter results by the student who the guardian is linked to. The identifier can be one of the following:  * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user * the string literal `"-"`, indicating that results should be returned for   all students that the requesting user has access to view.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list(params: Params$Resource$Userprofiles$Guardians$List, options: StreamMethodOptions): GaxiosPromise<Readable>;
        list(params?: Params$Resource$Userprofiles$Guardians$List, options?: MethodOptions): GaxiosPromise<Schema$ListGuardiansResponse>;
        list(params: Params$Resource$Userprofiles$Guardians$List, options: StreamMethodOptions | BodyResponseCallback<Readable>, callback: BodyResponseCallback<Readable>): void;
        list(params: Params$Resource$Userprofiles$Guardians$List, options: MethodOptions | BodyResponseCallback<Schema$ListGuardiansResponse>, callback: BodyResponseCallback<Schema$ListGuardiansResponse>): void;
        list(params: Params$Resource$Userprofiles$Guardians$List, callback: BodyResponseCallback<Schema$ListGuardiansResponse>): void;
        list(callback: BodyResponseCallback<Schema$ListGuardiansResponse>): void;
    }
    export interface Params$Resource$Userprofiles$Guardians$Delete extends StandardParameters {
        /**
         * The `id` field from a `Guardian`.
         */
        guardianId?: string;
        /**
         * The student whose guardian is to be deleted. One of the following:  * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user
         */
        studentId?: string;
    }
    export interface Params$Resource$Userprofiles$Guardians$Get extends StandardParameters {
        /**
         * The `id` field from a `Guardian`.
         */
        guardianId?: string;
        /**
         * The student whose guardian is being requested. One of the following:  * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user
         */
        studentId?: string;
    }
    export interface Params$Resource$Userprofiles$Guardians$List extends StandardParameters {
        /**
         * Filter results by the email address that the original invitation was sent to, resulting in this guardian link. This filter can only be used by domain administrators.
         */
        invitedEmailAddress?: string;
        /**
         * Maximum number of items to return. Zero or unspecified indicates that the server may assign a maximum.  The server may return fewer than the specified number of results.
         */
        pageSize?: number;
        /**
         * nextPageToken value returned from a previous list call, indicating that the subsequent page of results should be returned.  The list request must be otherwise identical to the one that resulted in this token.
         */
        pageToken?: string;
        /**
         * Filter results by the student who the guardian is linked to. The identifier can be one of the following:  * the numeric identifier for the user * the email address of the user * the string literal `"me"`, indicating the requesting user * the string literal `"-"`, indicating that results should be returned for   all students that the requesting user has access to view.
         */
        studentId?: string;
    }
    export {};
}
