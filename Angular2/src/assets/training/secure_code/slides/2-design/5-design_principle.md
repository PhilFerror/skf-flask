### The Rest of the Saltzer & Schroeder Design Principles

Let’s briefly look at the rest of the secure design principles identified by Saltzer and Schroeder (beyond least privilege and complete mediation):

1. **Economy of mechanism (aka simplicity)**. The system, in particular the part that security depends on, should be as simple and small as possible. This makes that part of the system easier to review and harder to get wrong. Of course, modern software is often asked to provide lots of functionality, so you typically cannot make everything extremely simple, but you can at least work to make the part that security depends on as simple as possible.

2. **Open design**. The protection mechanism must not depend on attacker ignorance. Instead, the mechanism should be public, depending on the secrecy of relatively few (and easily changeable) items like passwords or private keys. An open design makes extensive public scrutiny possible. An open design also makes it possible for users to convince themselves that the system about to be used is adequate. Frankly, it is not realistic to try to maintain secrecy for a system that is widely distributed; decompilers and subverted hardware can quickly expose any “secrets” in an implementation. One of the big advantages of open source software (OSS) is that it better implements the open design principle; OSS source code has an open design, enabling anyone else to review it and make changes to potentially improve it. Of course, the OSS has to *actually* be reviewed for this to help, but it is an important *potential* advantage.

3. **Fail-safe defaults (aka fail-secure defaults)**. The default installation should be the secure installation. If it is not certain that something should be allowed, don’t allow it. For example, don’t distribute software with an empty or default password; instead, *require* that a new password be set when the software is installed. That way, if someone just quickly installs it, it will not have a vulnerability due to a known password.

4. **Separation of privilege (e.g., use two-factor authentication)**. Access to objects should depend on more than one condition, so that breaking one condition does not break everything. In short, make sure that if your software has a login mechanism, it has a way to support two-factor authentication (2FA).

5. **Least common mechanism (aka minimize sharing)**. Minimize the amount and use of shared mechanisms if the sharers have different privileges. Avoid sharing files, directories, operating system kernel execution, or computers with something you don’t trust, because attackers might exploit them. Of course, in many cases this is traded off because of other factors. An obvious example is cloud services: in some cases, using a cloud service may cause your program to run in a shared environment with an adversary. In the case of cloud services, there are often mitigating factors that make it acceptable (e.g., the cloud service provider may provide a host of measures to provide better isolation, and/or may have a more experienced team protecting and monitoring the systems than you could). That said, it is still true that anything you share with an attacker might add another way for it to get attacked. If such sharing is too risky for your application, then you could choose alternatives with less sharing (such as a single-tenant cloud or a private cloud). In some cases sharing can reduce costs but increase security risks. The best decision depends on the circumstances, and all the design principles can do is help you identify the trade-off.

6. **Psychological acceptability (aka easy to use)**. The human interface must be designed for ease of use so users will routinely and automatically use the protection mechanisms correctly. Mistakes will be reduced if the security mechanisms closely match the user’s mental image of his or her protection goals. Some people think that there is always a trade between security and ease-of-use, but that is often not true; if something is hard to use, it is often insecure in practice (because people will work around it). Bad ease-of-use for security reasons usually shows that the software was not designed to be secure in the first place; hopefully this course will help you avoid that!