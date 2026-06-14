# Security Specifications & Hardened TDD for Heerang (희랑)

This document contains security invariants and the "Dirty Dozen" unauthorized payloads designed to test and violate security rules. Access control policies enforce Attribute-Based Access Control (ABAC) and a zero-trust layout.

## 1. Data Invariants

1. **Self-Authenticating Profiles**: A user can only create, update, or read their own user profile document in the `users/{userId}` collection.
2. **Review Integrity**:
   - Reviews can be created and read by anybody authenticated.
   - A user can only update or delete a review they themselves authored.
   - Users cannot modify the creator `userId` on update.
3. **Inquiry Isolation**:
   - Inquiries can be submitted by any authenticated user.
   - Users can only read (`get` and list) their *own* inquiries (`resource.data.userId == request.auth.uid`). No public viewing of inquiries is allowed.
   - Once submitted, inquiries are immutable or only deletable by the author within a threshold. They cannot be tampered with by other users.
4. **StoryLikes Invariance**:
   - StoryLikes can be created and deleted (unliked) only by the user who owns that vote.
   - The document ID can represent user engagement (`{userId}_{storyId}`) to prevent redundant votes, and is checked for length and alphanumeric format.

---

## 2. The "Dirty Dozen" Malicious Payloads (Vulnerability Scenarios)

The following 12 payloads or requests designed to exploit potential "Update-Gaps" or "Identity Spoofing" must be strictly blocked by the database rules with a `PERMISSION_DENIED` response.

### Category A: Identity Spoofing (Attempting to impersonate other users)

#### Payload 1: Create profile for someone else
- **Target Path**: `/users/victim_user_123`
- **Request Auth**: `uid: "attacker_user_456"`, `email_verified: true`
- **Payload**:
  ```json
  {
    "uid": "victim_user_123",
    "displayName": "Spoofed Name",
    "email": "victim@gmail.com",
    "createdAt": "request.time"
  }
  ```
- **Reason to Denied**: Auth UID (`attacker_user_456`) does not match path variable (`victim_user_123`).

#### Payload 2: Create a review as someone else
- **Target Path**: `/reviews/new_review_789`
- **Request Auth**: `uid: "attacker_user_456"`, `email_verified: true`
- **Payload**:
  ```json
  {
    "userId": "victim_user_123",
    "userName": "Victim Name",
    "productId": "digestion",
    "rating": 5,
    "title": "Legit review",
    "content": "Perfect wellness pack!",
    "createdAt": "request.time"
  }
  ```
- **Reason to Denied**: The payload's `userId` must equal the caller's auth UID.

#### Payload 3: Intercept other user's inquiry
- **Target Path**: `/inquiries/victim_inquiry_999`
- **Action**: Read (`get`)
- **Request Auth**: `uid: "attacker_user_456"`, `email_verified: true`
- **Victim Data**: `userId: "victim_user_123"`
- **Reason to Denied**: Non-owners cannot read individual inquiries.

---

### Category B: State Shortcutting & Privilege Escalation (Modifying unauthorized parameters)

#### Payload 4: Arbitrary Admin Flag Injection in User Profile
- **Target Path**: `/users/attacker_user_456`
- **Request Auth**: `uid: "attacker_user_456"`, `email_verified: true`
- **Payload**:
  ```json
  {
    "uid": "attacker_user_456",
    "displayName": "Hacker Prime",
    "email": "attacker@gmail.com",
    "createdAt": "request.time",
    "role": "admin",
    "isAdmin": true
  }
  ```
- **Reason to Denied**: Profile fields are strictly defined. Extra keys like `isAdmin` or `role` are denied via strict keys size and field validations.

#### Payload 5: Altering Review Creator ID on Update
- **Target Path**: `/reviews/attacker_review_001` (authored by attacker)
- **Request Auth**: `uid: "attacker_user_456"`, `email_verified: true`
- **Existing Content**: `{ "userId": "attacker_user_456", "rating": 5, "title": "Good" }`
- **Payload**:
  ```json
  {
    "userId": "victim_user_123",
    "userName": "Victim",
    "productId": "digestion",
    "rating": 1,
    "title": "Ruined Review",
    "content": "Changed ownership",
    "createdAt": "request.time"
  }
  ```
- **Reason to Denied**: Critical fields like `userId` are immutable upon update.

#### Payload 6: Modifying review rating to invalid out-of-bounds score
- **Target Path**: `/reviews/attacker_review_001`
- **Request Auth**: `uid: "attacker_user_456"`, `email_verified: true`
- **Payload**:
  ```json
  {
    "userId": "attacker_user_456",
    "userName": "Attacker",
    "productId": "digestion",
    "rating": 99,
    "title": "Excellent",
    "content": "Spammed high level rating",
    "createdAt": "request.time"
  }
  ```
- **Reason to Denied**: Rating value must be `rating >= 1 && rating <= 5`.

---

### Category C: Resource & Value Poisoning (Junk characters and Denial of Wallet size bounds)

#### Payload 7: Exploding text field sizing (Denial of Wallet payload)
- **Target Path**: `/reviews/review_001`
- **Request Auth**: `uid: "attacker_user_456"`
- **Payload**:
  ```json
  {
    "userId": "attacker_user_456",
    "userName": "Attacker",
    "productId": "digestion",
    "rating": 5,
    "title": "A".repeat(100000), // Massive string
    "content": "Excessive content detail load...",
    "createdAt": "request.time"
  }
  ```
- **Reason to Denied**: String lengths must contain bounds limits (e.g. title <= 150 characters).

#### Payload 8: Path traversal injection via document ID poisoning
- **Target Path**: `/reviews/../../systemDocs/rootConfig`
- **Request Auth**: `uid: "attacker_user_456"`
- **Reason to Denied**: Path variable verification strictly validates alphanumerics/dashes via `isValidId()`.

#### Payload 9: Malicious sub-property injection via untrusted map
- **Target Path**: `/inquiries/inquiry_001`
- **Request Auth**: `uid: "attacker_user_456"`
- **Payload**:
  ```json
  {
    "userId": "attacker_user_456",
    "userName": "Attacker",
    "email": "attacker@gmail.com",
    "category": "소화환",
    "title": "Valid title",
    "content": "Valid details",
    "createdAt": "request.time",
    "extraMetadata": {
      "internalAction": "RESET_SYSTEM",
      "escalatedQuery": true
    }
  }
  ```
- **Reason to Denied**: Keys constraints block unlisted properties (`data.keys().size() == N`).

---

### Category D: Blind Lists and Temporal Infidelity

#### Payload 10: Client-side tampering of creation timestamps
- **Target Path**: `/reviews/new_review_abc`
- **Request Auth**: `uid: "attacker_user_456"`
- **Payload**:
  ```json
  {
    "userId": "attacker_user_456",
    "userName": "Attacker",
    "productId": "digestion",
    "rating": 4,
    "title": "Test Title",
    "content": "Test text",
    "createdAt": "2010-01-01T00:00:00Z" // Client chosen retroactive time
  }
  ```
- **Reason to Denied**: Timestamps must equal exact server time (`request.time`).

#### Payload 11: Reader Likes Spoofing (Attempting to like a story for someone else)
- **Target Path**: `/storyLikes/like_001`
- **Request Auth**: `uid: "attacker_user_456"`
- **Payload**:
  ```json
  {
    "userId": "victim_user_123",
    "storyId": "gut_health_01",
    "createdAt": "request.time"
  }
  ```
- **Reason to Denied**: `userId` field in Like payload must equal the caller's auth UID.

#### Payload 12: Broad collection list queries without user constraints (Scraping private contact logs)
- **Target Path**: `/inquiries`
- **Action**: Query list (e.g., fetch all inquiries)
- **Request Auth**: `uid: "attacker_user_456"`
- **Reason to Denied**: Unauthorized users cannot perform generalized queries. The security rule itself rejects broad queries unless they filter precisely where `userId == request.auth.uid`.

---

## 3. Test Verification Rules

Rules are vetted by compiling the blueprint and checking all fields against a structured type blueprint. If any payload penetrates, the rules are marked as a **FAILED SYSTEM STATE**.
